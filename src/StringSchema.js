export default class StringSchema {
  constructor(validators) {
    this.validators = [...validators];
  }

  isValid(value) {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // every не вополняется далее, если не выполнено условие для текущего элемента:
    // в таком случае сразу возвращает false (как оператор &&)
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return this.validators.every((validator) => validator(value) === true);
  }

  startsFromUpperCase() {
    const validator = (value) => {
      if (!value.length) return false;
      const firstLetter = value[0];
      return firstLetter.toUpperCase() === firstLetter && firstLetter.toLowerCase() !== firstLetter;
    };
    return new StringSchema([...this.validators, validator]);
  }

  length(strLength) {
    const validator = (value) => value.length === strLength;
    return new StringSchema([...this.validators, validator]);
  }

  hasExclamation() {
    const validator = (value) => value.split('!').length > 1;
    return new StringSchema([...this.validators, validator]);
  }
}
