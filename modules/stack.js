export default class stackClass {
    constructor() {
        this.stack = []
    }
    push(value) {
        return this.stack.push(value)
    }
    pop() {
        return this.stack.pop()
    }
}