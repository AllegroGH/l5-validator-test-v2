export default class StringSchema {
  constructor(validators) {
    this.validators = [...validators];
  }

  isValid(value) {
    return this.validators.every((validator) => validator(value) === true);
  }

  startsFromUpperCase() {
    const validator = (value) => {
      if (typeof value !== 'string' || !value.length) return false;
      const firstLetter = value[0];
      return firstLetter.toUpperCase() === firstLetter && firstLetter.toLowerCase() !== firstLetter;
    };
    return new StringSchema([...this.validators, validator]);
  }

  length(strLength) {
    const validator = (value) => {
      if (typeof value !== 'string' || value.length !== strLength) return false;
      return true;
    };
    return new StringSchema([...this.validators, validator]);
  }

  hasExclamation() {
    const validator = (value) => {
      if (typeof value !== 'string') return false;
      return value.split('!').length > 1;
    };
    return new StringSchema([...this.validators, validator]);
  }
}
