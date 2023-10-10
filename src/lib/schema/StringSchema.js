import BaseSchema from './BaseSchema';
import notNull from '../rules/notNull';
import notEmptyString from '../rules/notEmptyString';
import minLengthString from '../rules/minLengthString';
import containsString from '../rules/containsString';

export default class StringSchema extends BaseSchema {
  required() {
    this.addRule(notNull);
    this.addRule(notEmptyString);

    return this;
  }

  minLength(minLength = 0) {
    this.expected.minLengthString = [minLength];
    this.addRule(minLengthString);

    return this;
  }

  contains(matchStr = '') {
    this.expected.containsString = [matchStr];
    this.addRule(containsString);

    return this;
  }
}
