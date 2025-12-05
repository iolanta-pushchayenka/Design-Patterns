import { Triangle } from "../entities/TriangleEntity";
import { Tetrahedron } from "../entities/TetrahedronEntity";
import { Point } from "../entities/Point";
import { SortById } from "../repository/comparators/SortById";
import { SortByName } from "../repository/comparators/SortByName";
import { SortByPointX } from "../repository/comparators/SortByPointX";
import { SortByPointY } from "../repository/comparators/SortByPointY";

describe("Comparators", () => {

    describe("SortById", () => {
        it("should sort shapes by id", () => {
            const t1 = new Triangle("2", "B", new Point(0, 0), new Point(0, 0), new Point(0, 0));
            const t2 = new Triangle("1", "A", new Point(0, 0), new Point(0, 0), new Point(0, 0));
            const t3 = new Triangle("3", "C", new Point(0, 0), new Point(0, 0), new Point(0, 0));

            const arr = [t1, t2, t3].sort(SortById);
            expect(arr.map(s => s.id)).toEqual(["1", "2", "3"]);
        });
    });

    describe("SortByName", () => {
        it("should sort shapes by name", () => {
            const t1 = new Triangle("1", "Charlie", new Point(0, 0), new Point(0, 0), new Point(0, 0));
            const t2 = new Triangle("2", "Alice", new Point(0, 0), new Point(0, 0), new Point(0, 0));
            const t3 = new Triangle("3", "Bob", new Point(0, 0), new Point(0, 0), new Point(0, 0));

            const arr = [t1, t2, t3].sort(SortByName.compare);
            expect(arr.map(s => s.name)).toEqual(["Alice", "Bob", "Charlie"]);
        });
    });

    describe("SortByPointX", () => {
        it("should sort shapes by the X coordinate of first point", () => {
            const t1 = new Triangle("1", "A", new Point(3, 0), new Point(0, 0), new Point(0, 0));
            const t2 = new Triangle("2", "B", new Point(1, 0), new Point(0, 0), new Point(0, 0));
            const t3 = new Tetrahedron("3", "C", new Point(2, 0, 0), new Point(0, 0, 0), new Point(0, 0, 0), new Point(0, 0, 0));

            const arr = [t1, t2, t3].sort(SortByPointX.compare);
            expect(arr.map(s => (s as any).a?.x ?? (s as any).p1.x)).toEqual([1, 2, 3]);
        });
    });

    describe("SortByPointY", () => {
        it("should sort shapes by the Y coordinate of first point", () => {
            const t1 = new Triangle("1", "A", new Point(0, 3), new Point(0, 0), new Point(0, 0));
            const t2 = new Triangle("2", "B", new Point(0, 1), new Point(0, 0), new Point(0, 0));
            const t3 = new Tetrahedron("3", "C", new Point(0, 2, 0), new Point(0, 0, 0), new Point(0, 0, 0), new Point(0, 0, 0));

            const arr = [t1, t2, t3].sort(SortByPointY.compare);
            expect(arr.map(s => (s as any).a?.y ?? (s as any).p1.y)).toEqual([1, 2, 3]);
        });
    });

});
