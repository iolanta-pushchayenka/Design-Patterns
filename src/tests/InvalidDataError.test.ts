import { InvalidDataError } from "../exceptions/InvalidDataError";

describe("InvalidDataError", () => {
    test("creates error with message", () => {
        const err = new InvalidDataError("Invalid data");

        expect(err.message).toBe("Invalid data");
    });

    test("has correct name", () => {
        const err = new InvalidDataError("Error occurred");

        expect(err.name).toBe("InvalidDataError");
    });

    test("is instance of Error", () => {
        const err = new InvalidDataError("Test");

        expect(err instanceof Error).toBe(true);
    });

    test("is instance of InvalidDataError", () => {
        const err = new InvalidDataError("Test");

        expect(err instanceof InvalidDataError).toBe(true);
    });

    test("can be thrown and caught", () => {
        const thrower = () => { throw new InvalidDataError("Boom!"); };

        expect(thrower).toThrow(InvalidDataError);
        expect(thrower).toThrow("Boom!");
    });
});
