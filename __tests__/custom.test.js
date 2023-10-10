import { expect, test } from '@jest/globals';
import Validator from '../src';

test('custom string schema, startWith rule', () => {
  const v = new Validator();
  const fn = (value, start) => value.startsWith(start);
  v.addValidator('string', 'startWith', fn);
  const schema = v.string().test('startWith', 'H');

  expect(schema.isValid('Hexlet')).toBeTruthy();
  expect(schema.isValid('exlet')).toBeFalsy();
});

test('custom number schema, min rule', () => {
  const v = new Validator();
  const fn = (value, min) => value >= min;
  v.addValidator('number', 'min', fn);
  const schema = v.number().test('min', 5);

  expect(schema.isValid(6)).toBeTruthy();
  expect(schema.isValid(4)).toBeFalsy();
});
