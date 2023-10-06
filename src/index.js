export default class Validator {
  constructor() {
    this.validations = [];
  }

  string() {
    const schema = {
      isValid: (value) => typeof value === 'string' || value === null || value === undefined,
    };
    this.validations.push(schema);
    return this;
  }

  required() {
    const schema = {
      isValid: (value) => value !== null && value !== undefined && value !== '',
    };
    this.validations.push(schema);
    return this;
  }

  minLength(length) {
    const schema = {
      isValid: (value) => value.length >= length,
    };
    this.validations.push(schema);
    return this;
  }

  contains(substring) {
    const schema = {
      isValid: (value) => value.includes(substring),
    };
    this.validations.push(schema);
    return this;
  }

  isValid(value) {
    return this.validations.every((schema) => schema.isValid(value));
  }

  number() {
    const numberSchema = {
      isValid: (value) => typeof value === 'number' || value === null || value === undefined,
    };
    this.validations.push(numberSchema);

    return {
      required: () => {
        const requiredSchema = {
          isValid: (value) => value !== null && value !== undefined,
        };
        this.validations.push(requiredSchema);
        return this;
      },
      positive: () => {
        const positiveSchema = {
          isValid: (value) => typeof value === 'number' && value > 0,
        };
        this.validations.push(positiveSchema);
        return this;
      },
      range: (min, max) => {
        const rangeSchema = {
          isValid: (value) => typeof value === 'number' && value >= min && value <= max,
        };
        this.validations.push(rangeSchema);
        return this;
      },
      isValid: (value) => this.validations.every((schema) => schema.isValid(value)),
    };
  }

  array() {
    const arraySchema = {
      isValid: (value) => Array.isArray(value) || value === null || value === undefined,
    };
    this.validations.push(arraySchema);
    return {
      required: () => {
        const requiredSchema = {
          isValid: (value) => Array.isArray(value),
        };
        this.validations.push(requiredSchema);
        return this;
      },
      sizeof: (length) => {
        const sizeofSchema = {
          isValid: (value) => Array.isArray(value) && value.length === length,
        };
        this.validations.push(sizeofSchema);
        return this;
      },
      isValid: (value) => this.validations.every((schema) => schema.isValid(value)),
    };
  }
  
  object() {
    const objectSchema = {
      isValid: (value) => typeof value === 'object' && value !== null,
    };
    this.validations.push(objectSchema);
    return {
      shape: (shape) => {
        const shapeSchema = {
          isValid: (value) => {
            if (typeof value !== 'object' || value === null) {
              return false;
            }
            for (const key in shape) {
              if (shape.hasOwnProperty(key)) {
                const schema = shape[key];
                if (!schema.isValid(value[key])) {
                  return false;
                }
              }
            }
            return true;
          },
        };
        this.validations.push(shapeSchema);
        return this;
      },
      isValid: (value) => this.validations.every((schema) => schema.isValid(value)),
    };
  }  
}


const v = new Validator();

const schema = v.object();

schema.shape({
  name: v.string().required(),
  age: v.number().positive(),
});

console.log(schema.isValid({ name: 'kolya', age: 100 })); // true
console.log(schema.isValid({ name: 'maya', age: null })); // true
console.log(schema.isValid({ name: '', age: null })); // false
console.log(schema.isValid({ name: 'ada', age: -5 })); // false
