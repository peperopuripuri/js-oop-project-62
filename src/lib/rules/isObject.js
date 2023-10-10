const isObject = (val) => val !== null && !Array.isArray(val) && typeof val === 'object';

export default isObject;
