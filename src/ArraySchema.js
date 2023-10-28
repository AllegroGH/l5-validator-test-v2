export default class ArraySchema {
  constructor(validators) {
    this.validators = [...validators];
  }

  isValid(value) {
    return this.validators.every((validator) => validator(value) === true);
  }

  maxDepth(depth) {
    const validator = (value) => {
      // const iter = (iterValue, iterDepth) => {                      // не учитывает изменчивость
      //   if (!Array.isArray(iterValue)) return true;
      //   if (iterDepth < 0) return false;
      //   return iterValue.reduce((acc, el) => iter(el, iterDepth - 1), true);
      // };
      const iter = (iterValue, iterDepth) => {
        if (!Array.isArray(iterValue)) return true;
        if (iterDepth < 0) return false;
        return iterValue.reduce((acc, el) => acc && iter(el, iterDepth - 1), true);
      };
      return iter(value, depth);
    };
    return new ArraySchema([...this.validators, validator]);
  }
}
