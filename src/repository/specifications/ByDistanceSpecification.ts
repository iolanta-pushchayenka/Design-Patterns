import { Specification } from "./Specification";
import { Triangle } from "../../entities/TriangleEntity";
import { Tetrahedron } from "../../entities/TetrahedronEntity";

export class ByDistanceSpecification implements Specification<Triangle | Tetrahedron> {
    constructor(private min: number, private max: number) {}

    isSatisfiedBy(obj: Triangle | Tetrahedron): boolean {
        const points = "a" in obj
            ? [obj.a, obj.b, obj.c]
            : [obj.p1, obj.p2, obj.p3, obj.p4];

        const center = {
            x: points.reduce((s, p) => s + p.x, 0) / points.length,
            y: points.reduce((s, p) => s + p.y, 0) / points.length,
            z: points.reduce((s, p) => s + p.z, 0) / points.length,
        };

        const distance = Math.sqrt(
            center.x ** 2 + center.y ** 2 + center.z ** 2
        );

        return distance >= this.min && distance <= this.max;
    }
}
