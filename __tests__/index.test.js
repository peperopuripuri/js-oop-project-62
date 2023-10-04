import Validator from '../src/index.js';

describe('Validator', () => {
  let validator;

  beforeEach(() => {
    validator = new Validator();
  });

  describe('string()', () => {
    it('should validate a string', () => {
      const schema = validator.string();
      expect(schema.isValid('hello')).toBe(true);
    });

    it('should validate null and undefined', () => {
      const schema = validator.string();
      expect(schema.isValid(null)).toBe(true);
      expect(schema.isValid(undefined)).toBe(true);
    });
  });

  describe('required()', () => {
    it('should validate a non-empty string', () => {
      const schema = validator.required();
      expect(schema.isValid('hello')).toBe(true);
    });

    it('should not validate an empty string', () => {
      const schema = validator.required();
      expect(schema.isValid('')).toBe(false);
    });

    it('should not validate null or undefined', () => {
      const schema = validator.required();
      expect(schema.isValid(null)).toBe(false);
      expect(schema.isValid(undefined)).toBe(false);
    });
  });

  describe('minLength()', () => {
    it('should validate a string of the correct length', () => {
      const schema = validator.minLength(5);
      expect(schema.isValid('hello')).toBe(true);
    });

    it('should validate a string longer than the minimum length', () => {
      const schema = validator.minLength(5);
      expect(schema.isValid('hello world')).toBe(true);
    });

    it('should not validate a string shorter than the minimum length', () => {
      const schema = validator.minLength(5);
      expect(schema.isValid('hi')).toBe(false);
    });
  });

  describe('contains()', () => {
    it('should validate a string that contains the given substring', () => {
      const schema = validator.contains('hello');
      expect(schema.isValid('hello world')).toBe(true);
    });

    it('should not validate a string that does not contain the given substring', () => {
      const schema = validator.contains('hello');
      expect(schema.isValid('goodbye')).toBe(false);
    });
  });

  describe('isValid()', () => {
    it('should validate a value against all added validation rules', () => {
      const schema = validator.string().required().minLength(5);
      expect(schema.isValid('hello')).toBe(true);
      expect(schema.isValid('')).toBe(false);
      expect(schema.isValid(null)).toBe(false);
      expect(schema.isValid(undefined)).toBe(false);
      expect(schema.isValid('hi')).toBe(false);
    });
  });

  it('should validate null as a valid number', () => {
    const v = new Validator();
    const schema = v.number();
    expect(schema.isValid(null)).toBe(true);
  });

  it('should validate required number correctly', () => {
    const v = new Validator();
    const schema = v.number().required();
    expect(schema.isValid(null)).toBe(false);
    expect(schema.isValid(7)).toBe(true);
  });

  it('should validate positive number correctly', () => {
    const v = new Validator();
    const schema = v.number().positive();
    expect(schema.isValid(10)).toBe(true);
    expect(schema.isValid(-5)).toBe(false);
  });

  it('should validate number within range correctly', () => {
    const v = new Validator();
    const schema = v.number().range(-5, 5);
    expect(schema.isValid(-6)).toBe(false);
    expect(schema.isValid(5)).toBe(true);
  });
});
