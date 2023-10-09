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

    numberSchema.test = (name, ...args) => {
      const schema = {
        isValid: (value) => {
          for (let i = 0; i < this.validations.length; i += 1) {
            const validation = this.validations[i];
            if (validation.name === name && validation.type === 'number') {
              return validation.fn(value, ...args);
            }
          }
          return true;
        },
      };
      return schema;
    };

    numberSchema.required = () => {
      const requiredSchema = {
        isValid: (value) => value !== null && value !== undefined,
      };
      this.validations.push(requiredSchema);
      return this;
    };

    numberSchema.positive = () => {
      const positiveSchema = {
        isValid: (value) => value === null || (typeof value === 'number' && value > 0),
      };
      this.validations.push(positiveSchema);
      return this;
    };

    numberSchema.range = (min, max) => {
      const rangeSchema = {
        isValid: (value) => typeof value === 'number' && value >= min && value <= max,
      };
      this.validations.push(rangeSchema);
      return this;
    };

    this.validations.push(numberSchema);

    return numberSchema;
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

    const shapeSchema = {
      shape: (shape) => {
        const shapeSchemaFn = {
          isValid: (value) => {
            if (typeof value !== 'object' || value === null) {
              return false;
            }
            const keys = Object.keys(shape);
            return keys.every((key) => {
              if (Object.prototype.hasOwnProperty.call(shape, key)) {
                const schema = shape[key];
                return schema.isValid(value[key]);
              }
              return true;
            });
          },
        };
        this.validations.push(shapeSchemaFn);
        return shapeSchema;
      },
      isValid: (value) => this.validations.every((schema) => schema.isValid(value)),
    };
    return shapeSchema;
  }

  addValidator(type, name, fn) {
    const validatorSchema = {
      type,
      name,
      fn,
    };
    this.validations.push(validatorSchema);
  }

  test(name, ...args) {
    const schema = {
      isValid: (value) => {
        for (let i = 0; i < this.validations.length; i += 1) {
          const validation = this.validations[i];
          if (validation.name === name) {
            return validation.fn(value, ...args);
          }
        }
        return true;
      },
    };
    return schema;
  }
}
