import Validator from '../src/index.js';

describe('Validator', () => {
  let validator;

  beforeEach(() => {
    validator = new Validator();
  });

  describe('string tests', () => {
    it('should validate a string', () => {
      const schema = validator.string();
      expect(schema.isValid('hello')).toBe(true);
    });

    it('should validate null and undefined', () => {
      const schema = validator.string();
      expect(schema.isValid(null)).toBe(true);
      expect(schema.isValid(undefined)).toBe(true);
    });

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

    it('should validate a string that contains the given substring', () => {
      const schema = validator.contains('hello');
      expect(schema.isValid('hello world')).toBe(true);
    });

    it('should not validate a string that does not contain the given substring', () => {
      const schema = validator.contains('hello');
      expect(schema.isValid('goodbye')).toBe(false);
    });

    it('should validate a value against all added validation rules', () => {
      const schema = validator.string().required().minLength(5);
      expect(schema.isValid('hello')).toBe(true);
      expect(schema.isValid('')).toBe(false);
      expect(schema.isValid(null)).toBe(false);
      expect(schema.isValid(undefined)).toBe(false);
      expect(schema.isValid('hi')).toBe(false);
    });
  });

  describe('number tests', () => {
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
  })

  describe('array tests', () => {
    let validator;

    beforeEach(() => {
      validator = new Validator();
    });

    it('should return true if value is null or undefined', () => {
      const schema = validator.array();

      expect(schema.isValid(null)).toBe(true);
      expect(schema.isValid(undefined)).toBe(true);
    });

    it('should return true if value is an array', () => {
      const schema = validator.array();

      expect(schema.isValid([])).toBe(true);
      expect(schema.isValid([1, 2, 3])).toBe(true);
    });

    it('should return false if value is not an array', () => {
      const schema = validator.array();

      expect(schema.isValid('not an array')).toBe(false);
      expect(schema.isValid(123)).toBe(false);
      expect(schema.isValid({})).toBe(false);
    });

    it('should return false if value is not an array and required', () => {
      const schema = validator.array().required();

      expect(schema.isValid(null)).toBe(false);
      expect(schema.isValid(undefined)).toBe(false);
      expect(schema.isValid('not an array')).toBe(false);
      expect(schema.isValid(123)).toBe(false);
      expect(schema.isValid({})).toBe(false);
    });

    it('should return true if value is an array and required', () => {
      const schema = validator.array().required();

      expect(schema.isValid([])).toBe(true);
      expect(schema.isValid([1, 2, 3])).toBe(true);
    });

    it('should return false if array size is not equal to specified size', () => {
      const schema = validator.array().sizeof(2);

      expect(schema.isValid([])).toBe(false);
      expect(schema.isValid([1])).toBe(false);
      expect(schema.isValid([1, 2, 3])).toBe(false);
    });

    it('should return true if array size is equal to specified size', () => {
      const schema = validator.array().sizeof(2);

      expect(schema.isValid([1, 2])).toBe(true);
      expect(schema.isValid(['a', 'b'])).toBe(true);
    });
  });

  describe('object tests', () => {
    let v;
  
    beforeEach(() => {
      v = new Validator();
    });
  
    it('should return true for a valid object with specified shape', () => {
      const schema = v.object().shape({
        name: v.string().required(),
        age: v.number().positive(),
      });
  
      expect(schema.isValid({ name: 'kolya', age: 100 })).toBe(true);
    });
  
    it('should return true for a valid object with missing optional properties', () => {
      const schema = v.object().shape({
        name: v.string().required(),
        age: v.number().positive(),
        email: v.string().optional(),
      });
  
      expect(schema.isValid({ name: 'maya', age: 25 })).toBe(true);
    });
  
    it('should return false for an object with missing required properties', () => {
      const schema = v.object().shape({
        name: v.string().required(),
        age: v.number().positive(),
      });
  
      expect(schema.isValid({ name: 'ada' })).toBe(false);
    });
  
    it('should return false for an object with invalid property values', () => {
      const schema = v.object().shape({
        name: v.string().required(),
        age: v.number().positive(),
      });
  
      expect(schema.isValid({ name: 'kolya', age: -5 })).toBe(false);
    });
  
    it('should return false for a non-object value', () => {
      const schema = v.object().shape({
        name: v.string().required(),
        age: v.number().positive(),
      });
  
      expect(schema.isValid('invalid')).toBe(false);
    });
  });  
});
