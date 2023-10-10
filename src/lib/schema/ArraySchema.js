import BaseSchema from './BaseSchema';
import notNull from '../rules/notNull';
import isArray from '../rules/isArray';
import sizeof from '../rules/sizeof';

export default class ArraySchema extends BaseSchema {
  required() {
    this.addRule(notNull);
    this.addRule(isArray);

    return this;
  }

  sizeof(size) {
    this.expected.sizeof = [size];
    this.addRule(sizeof);

    return this;
  }
}
