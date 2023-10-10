import { expect, test } from '@jest/globals';
import Validator from '../src';

test('number schema, default rule', () => {
  const v = new Validator();
  const schema = v.number();

  expect(schema.isValid(null)).toBeTruthy();
});

test('number schema, required rule', () => {
  const v = new Validator();
  const schema = v.number();
  schema.required();

  expect(schema.isValid(null)).toBeFalsy();
  expect(schema.isValid(10)).toBeTruthy();
  expect(schema.isValid(-1)).toBeTruthy();
});

test('number schema, positive rule', () => {
  const v = new Validator();
  const schema = v.number();
  schema.positive();

  expect(schema.isValid(null)).toBeTruthy();
  expect(schema.isValid(10)).toBeTruthy();
  expect(schema.isValid(-1)).toBeFalsy();
});

test('number schema, range rule', () => {
  const v = new Validator();
  const schema = v.number();
  schema.range(-5, 5);

  expect(schema.isValid(1)).toBeTruthy();
  expect(schema.isValid(-6)).toBeFalsy();
});
