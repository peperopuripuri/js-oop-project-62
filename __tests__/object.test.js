import { expect, test } from '@jest/globals';
import Validator from '../src';

test('object shape schema', () => {
  const v = new Validator();
  const schema = v.object();
  schema.shape({
    name: v.string().required(),
    age: v.number().positive(),
  });

  expect(schema.isValid({ name: 'kolya', age: 100 })).toBeTruthy();
  expect(schema.isValid({ name: 'maya', age: null })).toBeTruthy();
  expect(schema.isValid({ name: '', age: null })).toBeFalsy();
  expect(schema.isValid({ name: 'ada', age: -5 })).toBeFalsy();
});
