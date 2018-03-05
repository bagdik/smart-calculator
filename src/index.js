class SmartCalculator {
  constructor(initValue) {
    this.init = initValue;
    this.operations = [];
  }
  get result() {
    let rpn = [this.init]; // reverse polish notation
    let ops = [];

    this.operations.forEach(op => { 
      while (ops.length && (ops[ops.length - 1]).priority <= op.priority) {
        rpn.push(ops.pop().op);
      }
      ops.push(op);
      rpn.push(op.val);
    });
    while (ops.length) {
      rpn.push(ops.pop().op)
    }
    let res = [];
    rpn.forEach(token => {
      if (typeof token === 'function') {
        res.push(token(res.pop(), res.pop()));
      } else {
        res.push(token);
      }
    });
    return res.pop();
  }
  add(number) {
    this.operations.push({
        op : (a, b) => a + b,
        priority : 2,
        val : number
    });
    return this;
  }
  
  subtract(number) {
    this.operations.push({
        op : (a, b) => b - a,
        priority : 2,
        val : number
    });
    return this;
  }

  multiply(number) {
    this.operations.push({
        op : (a, b) => a * b,
        priority : 1,
        val : number
    });
    return this;
  }

  devide(number) {
    this.operations.push({
        op : (a, b) => b / a,
        priority : 1,
        val : number
    });
    return this;
  }

  pow(number) {
    this.operations.push({
        op : (a, b) => Math.pow(b, a),
        priority : 0,
        val : number
    });
    return this;
  }
  valueOf(){
      return this.result;
  }
}
module.exports = SmartCalculator;
