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
}
