import { Point } from "../entities/Point";
import { TriangleValidator } from "../services/TriangleValidator";
import { TetrahedronValidator } from "../services/TetrahedronValidator";
import { InvalidDataError } from "../exceptions/InvalidDataError";

describe("Validators", () => {

    describe("TriangleValidator", () => {
        const validator = new TriangleValidator();

        it("should parse a valid row into numbers", () => {
            const row = "1 2 3 4 5 6";
            expect(validator.parseRow(row)).toEqual([1, 2, 3, 4, 5, 6]);
        });

        it("should build points from numbers", () => {
            const nums = [1, 2, 3, 4, 5, 6];
            const points = validator.buildPoints(nums);
            expect(points.map(p => [p.x, p.y])).toEqual([[1, 2], [3, 4], [5, 6]]);
        });

        it("should validate proper points without errors", () => {
            const points = [new Point(0, 0), new Point(1, 0), new Point(0, 1)];
            expect(() => validator.validatePoints(points)).not.toThrow();
        });

        it("should throw for duplicate points", () => {
            const points = [new Point(0, 0), new Point(0, 0), new Point(1, 1)];
            expect(() => validator.validatePoints(points)).toThrow(InvalidDataError);
        });

        it("should throw for collinear points", () => {
            const points = [new Point(0, 0), new Point(1, 1), new Point(2, 2)];
            expect(() => validator.validatePoints(points)).toThrow(InvalidDataError);
        });
    });

    describe("TetrahedronValidator", () => {
        const validator = new TetrahedronValidator();

        it("should parse a valid row into numbers", () => {
            const row = "1 2 3 4 5 6 7 8 9 10 11 12";
            expect(validator.parseRow(row)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        });

        it("should build points from numbers", () => {
            const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            const points = validator.buildPoints(nums);
            expect(points.map(p => [p.x, p.y, p.z])).toEqual([
                [1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]
            ]);
        });

        it("should validate proper points without errors", () => {
            const points = [
                new Point(0, 0, 0),
                new Point(1, 0, 0),
                new Point(0, 1, 0),
                new Point(0, 0, 1)
            ];
            expect(() => validator.validatePoints(points)).not.toThrow();
        });

        it("should throw for duplicate points", () => {
            const points = [
                new Point(0, 0, 0),
                new Point(0, 0, 0),
                new Point(1, 1, 1),
                new Point(2, 2, 2)
            ];
            expect(() => validator.validatePoints(points)).toThrow(InvalidDataError);
        });

        it("should throw for zero-volume points", () => {
            const points = [
                new Point(0, 0, 0),
                new Point(1, 0, 0),
                new Point(0, 1, 0),
                new Point(1, 1, 0) // all in the XY plane, volume = 0
            ];
            expect(() => validator.validatePoints(points)).toThrow(InvalidDataError);
        });
    });

});
