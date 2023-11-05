import { isPositiveNumberString } from "./number.ts";

describe("isPositiveNumberString", () => {
  it("should return true for valid positive number strings", () => {
    expect(isPositiveNumberString("123.45")).toBe(true);
    expect(isPositiveNumberString("0.5")).toBe(true);
    expect(isPositiveNumberString("0")).toBe(true);
  });

  it("should return false for invalid inputs", () => {
    expect(isPositiveNumberString("")).toBe(false);
    expect(isPositiveNumberString("-12")).toBe(false);
    expect(isPositiveNumberString("-")).toBe(false);
    expect(isPositiveNumberString("abc123")).toBe(false);
    expect(isPositiveNumberString("12.34.56")).toBe(false);
    expect(isPositiveNumberString("12.a")).toBe(false);
  });
});
