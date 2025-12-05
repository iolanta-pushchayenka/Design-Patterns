import { Warehouse } from "../warehouse/Warehouse";
import { Triangle } from "../entities/TriangleEntity";
import { Point } from "../entities/Point";

describe("Warehouse Observer & Singleton", () => {
    let warehouse: Warehouse;
    let tri: Triangle;

    beforeEach(() => {
        warehouse = Warehouse.getInstance();
        warehouse.clear(); // очищаем старые метрики

        // Создаём треугольник
        tri = new Triangle(
            "t1",
            "Triangle1",
            new Point(0, 0),
            new Point(3, 0),
            new Point(0, 4)
        );

        // Регистрируем в Warehouse, чтобы Warehouse сразу посчитал метрики
        warehouse.register(tri);
    });

    it("should calculate initial metrics correctly", () => {
        const metrics = warehouse.get("t1");
        expect(metrics?.area).toBeCloseTo(6);        // 1/2 * 3 * 4
        expect(metrics?.perimeter).toBeCloseTo(3 + 4 + 5); // 3-4-5 треугольник
    });

    it("should update metrics when triangle changes via setters", () => {
        // Изменяем точки треугольника через отдельные сеттеры
        tri.setA(new Point(0, 0));
        tri.setB(new Point(4, 0));
        tri.setC(new Point(0, 6));

        const metrics = warehouse.get("t1");
        expect(metrics?.area).toBeCloseTo(12); // 1/2 * 4 * 6

        // Новый периметр
        const AB = Math.sqrt((4 - 0) ** 2 + (0 - 0) ** 2); // 4
        const AC = Math.sqrt((0 - 0) ** 2 + (6 - 0) ** 2); // 6
        const BC = Math.sqrt((4 - 0) ** 2 + (0 - 6) ** 2); // sqrt(16 + 36) = sqrt(52)
        const perimeter = AB + AC + BC;

        expect(metrics?.perimeter).toBeCloseTo(perimeter);
    });

    it("should remove metrics when triangle is unregistered", () => {
        warehouse.unregister(tri);
        const metrics = warehouse.get("t1");
        expect(metrics).toBeUndefined();
    });

    it("should be singleton", () => {
        const warehouse2 = Warehouse.getInstance();
        expect(warehouse2).toBe(warehouse);
    });
});
