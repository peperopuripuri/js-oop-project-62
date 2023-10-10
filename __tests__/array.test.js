import { expect, test } from '@jest/globals';
import Validator from '../src';

test('array schema, default rule', () => {
  const v = new Validator();
  const schema = v.array();

  expect(schema.isValid(null)).toBeTruthy();
});

test('array schema, required rule', () => {
  const v = new Validator();
  const schema = v.array();
  schema.required();

  expect(schema.isValid(null)).toBeFalsy();
  expect(schema.isValid([])).toBeTruthy();
  expect(schema.isValid(['hexlet'])).toBeTruthy();
});

test('array schema, sizeof rule', () => {
  const v = new Validator();
  const schema = v.array();
  schema.sizeof(2);

  expect(schema.isValid(['hexlet'])).toBeFalsy();
  expect(schema.isValid(['hexlet', 'javascript'])).toBeTruthy();
});
