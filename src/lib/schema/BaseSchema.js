import isObject from '../rules/isObject';

export default class BaseSchema {
  constructor(rule = null) {
    this.expected = {};
    this.rules = [];
    this.objShape = {};

    if (typeof rule === 'function') {
      this.rules.push(rule);
    }
  }

  checkShape(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i] in this.objShape) {
        if (!this.objShape[keys[i]].checkRules(obj[keys[i]])) {
          return false;
        }
      }
    }

    return true;
  }

  checkRules(value) {
    for (let i = 0; i < this.rules.length; i += 1) {
      const fnRule = this.rules[i];
      const expectedParams = this.expected[fnRule.name] ?? [];
      if (!fnRule(value, ...expectedParams)) {
        return false;
      }
    }

    return true;
  }

  addRule(newRule) {
    for (let i = 0; i < this.rules.length; i += 1) {
      if (this.rules[i] === newRule) {
        return;
      }
    }

    this.rules.push(newRule);
  }

  test(expProp, expValue) {
    this.expected[expProp] = [expValue];

    return this;
  }

  isValid(value) {
    if (isObject(value)) {
      return this.checkShape(value);
    }

    return this.checkRules(value);
  }
}
