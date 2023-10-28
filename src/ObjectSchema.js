/* eslint class-methods-use-this: 0 */

export default class ObjectSchema {
  constructor(shapes) {
    this.validators = shapes;
  }

  isValid(value) {
    const validatorsKeys = Object.keys(this.validators).sort();
    const valueKeys = Object.keys(value).sort();
    if (validatorsKeys.length !== valueKeys.length) return false;
    if (validatorsKeys.filter((key, index) => key !== valueKeys[index]).length) return false;
    return valueKeys.every((key) => this.validators[key].isValid(value[key]));
  }

  shape(fields) {
    return new ObjectSchema(fields);
  }
}
