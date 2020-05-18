export class Calculator {
  constructor(value) {
    this.value = value;
  }

  add(v) {
    this.value += v;
    return this;
  }

  sub(v) {
    this.value -= v;
    return this;
  }

  mul(v) {
    this.value *= v;
    return this;
  }

  div(v) {
    this.value /= v;
    return this;
  }

  static value(value) {
    return new Calculator(value)
  }
}
