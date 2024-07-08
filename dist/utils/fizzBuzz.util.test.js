"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fizzBuzz_util_1 = require("./fizzBuzz.util");
describe("fizzBuzz test", () => {
    const fizzBuzz = new fizzBuzz_util_1.FizzBuzz();
    it('should return "Fizz" for numbers divisble by 3', () => {
        const fizzBuzz = new fizzBuzz_util_1.FizzBuzz();
        expect(fizzBuzz.fizzBuzz(3)).toBe("Fizz");
        expect(fizzBuzz.fizzBuzz(5)).toBe("Buzz");
    });
    it("should return the number itself if not 3 or 5", () => {
        expect(fizzBuzz.fizzBuzz(1)).toBe(1);
        expect(fizzBuzz.fizzBuzz(2)).toBe(2);
    });
    it("using mocks", () => {
        let mockFn = jest.fn(fizzBuzz.divisibleByThree).mockReturnValue(false);
        fizzBuzz.divisibleByThree = mockFn;
        expect(fizzBuzz.fizzBuzz(4)).toBe(4);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=fizzBuzz.util.test.js.map