"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FizzBuzz = void 0;
class FizzBuzz {
    constructor() {
        this.divisibleByThree = (num) => num % 3 == 0;
    }
    fizzBuzz(num) {
        let ret = "";
        if (this.divisibleByThree(num)) {
            console.log(num);
            ret += "Fizz";
        }
        if (num % 5 == 0) {
            ret += "Buzz";
        }
        return ret ? ret : num;
    }
}
exports.FizzBuzz = FizzBuzz;
const fizzBuzz = new FizzBuzz();
for (let i = 0; i < 20; i++) {
    console.log(fizzBuzz.fizzBuzz(i));
}
//# sourceMappingURL=fizzBuzz.util.js.map