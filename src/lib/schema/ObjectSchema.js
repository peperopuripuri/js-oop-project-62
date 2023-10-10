import BaseSchema from './BaseSchema';

export default class ObjectSchema extends BaseSchema {
  shape(obj) {
    this.objShape = obj;
  }
}
