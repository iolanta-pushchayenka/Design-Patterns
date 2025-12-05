import { Point } from "../entities/Point";
import { Triangle } from "../entities/TriangleEntity";
import { Tetrahedron } from "../entities/TetrahedronEntity";
import { Shape } from "../entities/Shape";
import type { Observer } from "../observers/Observer";

describe("Entities", () => {

    test("Point stores coordinates correctly", () => {
        const p = new Point(1, 2, 3);

        expect(p.x).toBe(1);
        expect(p.y).toBe(2);
        expect(p.z).toBe(3);
    });

    test("Shape stores id and name", () => {
        class TestShape extends Shape { }

        const s = new TestShape("id_1", "MyShape");

        expect(s.id).toBe("id_1");
        expect(s.name).toBe("MyShape");
    });

    test("Triangle notifies observer when point A changes", () => {
        const tri = new Triangle(
            "t1",
            "Triangle",
            new Point(0, 0),
            new Point(1, 0),
            new Point(0, 1)
        );

        const mockObserver: Observer = {
            update: jest.fn()
        };

        tri.addObserver(mockObserver);

        tri.setA(new Point(5, 5));

        expect(mockObserver.update).toHaveBeenCalledTimes(1);
    });

    test("Tetrahedron notifies observer when point changes", () => {
        const tet = new Tetrahedron(
            "tet1",
            "Tetrahedron",
            new Point(0, 0),
            new Point(1, 0),
            new Point(0, 1),
            new Point(0, 0, 1)
        );

        const mockObserver: Observer = {
            update: jest.fn()
        };

        tet.addObserver(mockObserver);

        tet.setP4(new Point(9, 9, 9));

        expect(mockObserver.update).toHaveBeenCalledTimes(1);
    });

});

