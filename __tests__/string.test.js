import { expect, test } from '@jest/globals';
import Validator from '../src';

test('string schema, default rule', () => {
  const v = new Validator();
  const schema = v.string();

  expect(schema.isValid('')).toBeTruthy();
  expect(schema.isValid(null)).toBeTruthy();
  expect(schema.isValid(undefined)).toBeTruthy();
  expect(schema.isValid('some text')).toBeTruthy();
});

test('string schema, required rule', () => {
  const v = new Validator();
  const schema = v.string();
  schema.required();

  expect(schema.isValid('go yuohoou!')).toBeTruthy();
  expect(schema.isValid(null)).toBeFalsy();
  expect(schema.isValid('')).toBeFalsy();
});

test('string schema, minLength rule', () => {
  const v = new Validator();
  const schema = v.string();
  schema.minLength(5);

  expect(schema.isValid('go yuohoou!')).toBeTruthy();
  expect(schema.isValid('four')).toBeFalsy();
  expect(schema.minLength(10).isValid('what does the fox say')).toBeTruthy();
  expect(schema.isValid('sea')).toBeFalsy();
});

test('string schema, contains rule', () => {
  const v = new Validator();
  const schema = v.string();
  schema.contains('go');

  expect(schema.isValid('go yuohoou!')).toBeTruthy();
  expect(schema.isValid('programm')).toBeFalsy();
  expect(schema.contains('what').isValid('what does the fox say')).toBeTruthy();
  expect(schema.isValid('sea')).toBeFalsy();
});
