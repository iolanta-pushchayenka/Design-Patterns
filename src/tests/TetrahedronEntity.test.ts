import { Tetrahedron } from "../entities/TetrahedronEntity";
import { Point } from "../entities/Point";

describe("Tetrahedron entity", () => {
    test("creates tetrahedron with 4 points", () => {
        const p1 = new Point(0, 0, 0);
        const p2 = new Point(1, 0, 0);
        const p3 = new Point(0, 1, 0);
        const p4 = new Point(0, 0, 1);

        const t = new Tetrahedron("Tet1", p1, p2, p3, p4);

        expect(t.id).toBe("Tet1");
        expect(t.p1).toBe(p1);
        expect(t.p2).toBe(p2);
        expect(t.p3).toBe(p3);
        expect(t.p4).toBe(p4);
    });

    test("tetrahedron extends Shape", () => {
        const p = new Point(0, 0, 0);
        const tet = new Tetrahedron("A", p, p, p, p);

        expect(tet instanceof Tetrahedron).toBe(true);
    });
});
