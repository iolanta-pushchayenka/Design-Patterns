import { CalculationError } from "../exceptions/CalculationError";

describe("CalculationError", () => {
  test("creates error with message", () => {
    const err = new CalculationError("Calc failed");

    expect(err.message).toBe("Calc failed");
  });

  test("has correct name", () => {
    const err = new CalculationError("Something");

    expect(err.name).toBe("CalculationError");
  });

  test("is instance of Error", () => {
    const err = new CalculationError("Test");

    expect(err instanceof Error).toBe(true);
  });

  test("is instance of CalculationError", () => {
    const err = new CalculationError("Test");

    expect(err instanceof CalculationError).toBe(true);
  });

  test("can be thrown and caught", () => {
    const fn = () => { throw new CalculationError("Oops"); };

    expect(fn).toThrow(CalculationError);
    expect(fn).toThrow("Oops");
  });
});
