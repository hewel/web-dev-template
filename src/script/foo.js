import { clone, toUpper } from 'ramda'
console.log('Hello World!')

class Foo {
  constructor(value) {
    this.val = Number(value)
  }
}
const foo = new Foo(toUpper('kill'))

console.log(clone(foo))
