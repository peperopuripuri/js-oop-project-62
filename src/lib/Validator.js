import StringSchema from './schema/StringSchema';
import NumberSchema from './schema/NumberSchema';
import ArraySchema from './schema/ArraySchema';
import ObjectSchema from './schema/ObjectSchema';

class Validator {
  constructor() {
    this.schema = null;
    this.customValidators = {
      string: null,
      number: null,
      array: null,
    };
  }

  getSchema() {
    return this.schema;
  }

  setSchema(schema) {
    this.schema = schema;
  }

  string() {
    this.setSchema(new StringSchema(this.customValidators.string));

    return this.getSchema();
  }

  number() {
    this.setSchema(new NumberSchema(this.customValidators.number));

    return this.getSchema();
  }

  array() {
    this.setSchema(new ArraySchema(this.customValidators.array));

    return this.getSchema();
  }

  object() {
    this.setSchema(new ObjectSchema());

    return this.getSchema();
  }

  addValidator(type, nameFunc, func) {
    this.customValidators[type] = Object.defineProperty(func, 'name', { value: nameFunc });
  }
}

export default Validator;
