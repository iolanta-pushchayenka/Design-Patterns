import { Specification } from "./Specification";
import { Triangle } from "../../entities/TriangleEntity";
import { Tetrahedron } from "../../entities/TetrahedronEntity";

export class ByCoordinatesSpecification implements Specification<Triangle | Tetrahedron> {
    constructor(
        private minX: number,
        private maxX: number,
        private minY: number,
        private maxY: number,
        private minZ: number,
        private maxZ: number
    ) {}

    isSatisfiedBy(obj: Triangle | Tetrahedron): boolean {
        const points = "a" in obj
            ? [obj.a, obj.b, obj.c]             // triangle
            : [obj.p1, obj.p2, obj.p3, obj.p4]; // tetrahedron

        return points.every(p =>
            p.x >= this.minX && p.x <= this.maxX &&
            p.y >= this.minY && p.y <= this.maxY &&
            p.z >= this.minZ && p.z <= this.maxZ
        );
    }
}
