export default class AsyncQueue {
  constructor() {
    this.values = [];
    this.resolvers = [];
  }

  enqueue(value) {
    if (this.resolvers.length > 0) {
      const resolve = this.resolvers.shift();
      resolve({ value, done: false });
    } else {
      this.values.push(value);
    }
  }

  next() {
    return new Promise(resolve => {
      if (this.values.length > 0) {
        const value = this.values.shift();
        resolve({ value, done: false });
      } else {
        this.resolvers.push(resolve);
      }
    });
  }

  [Symbol.iterator]() {
    return this;
  }
}
