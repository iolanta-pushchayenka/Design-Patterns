import { Point } from "../entities/Point";
import { Tetrahedron } from "../entities/TetrahedronEntity";
import { logger } from "../logger/logger";
import { CalculationError } from "../exceptions/CalculationError";

const EPS = 1e-9;

function toVec(p: Point) {
  return { x: p.x, y: p.y, z: p.z };
}

function sub(a: any, b: any) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function dot(a: any, b: any) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function cross(a: any, b: any) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

function length(a: any) {
  return Math.sqrt(dot(a, a));
}

function triangleArea(a: any, b: any, c: any): number {
  return 0.5 * length(cross(sub(b, a), sub(c, a)));
}

export class TetrahedronCalculator {

  static isValid(t: Tetrahedron): boolean {
    try {
      const A = toVec(t.p1);
      const B = toVec(t.p2);
      const C = toVec(t.p3);
      const D = toVec(t.p4);

      const volume6 = dot(
        cross(sub(B, A), sub(C, A)),
        sub(D, A)
      );

      return Math.abs(volume6) > EPS;
    } catch (err) {
      logger.error({ t, err }, "isValid failed");
      throw new CalculationError("Tetrahedron: validation failed");
    }
  }

  static volume(t: Tetrahedron): number {
    try {
      const A = toVec(t.p1);
      const B = toVec(t.p2);
      const C = toVec(t.p3);
      const D = toVec(t.p4);

      return Math.abs(
        dot(
          cross(sub(B, A), sub(C, A)),
          sub(D, A)
        ) / 6
      );
    } catch (err) {
      logger.error({ t, err }, "volume failed");
      throw new CalculationError("Tetrahedron: volume calculation failed");
    }
  }

  static surfaceArea(t: Tetrahedron): number {
    try {
      const A = toVec(t.p1);
      const B = toVec(t.p2);
      const C = toVec(t.p3);
      const D = toVec(t.p4);

      return (
        triangleArea(A, B, C) +
        triangleArea(A, B, D) +
        triangleArea(A, C, D) +
        triangleArea(B, C, D)
      );
    } catch (err) {
      logger.error({ t, err }, "surfaceArea failed");
      throw new CalculationError("Tetrahedron: surface area calculation failed");
    }
  }

  static baseLiesOnCoordinatePlane(t: Tetrahedron) {
    try {
      const faces = [
        [t.p1, t.p2, t.p3],
        [t.p1, t.p2, t.p4],
        [t.p1, t.p3, t.p4],
        [t.p2, t.p3, t.p4],
      ] as Point[][];

      const onXY = (tri: Point[]) => tri.every(p => Math.abs(p.z) < EPS);
      const onYZ = (tri: Point[]) => tri.every(p => Math.abs(p.x) < EPS);
      const onXZ = (tri: Point[]) => tri.every(p => Math.abs(p.y) < EPS);

      return {
        XY: faces.some(onXY),
        YZ: faces.some(onYZ),
        XZ: faces.some(onXZ),
      };
    } catch (err) {
      logger.error({ t, err }, "baseLiesOnCoordinatePlane failed");
      throw new CalculationError("Tetrahedron: coordinate plane analysis failed");
    }
  }

  
  static volumeRatio(t: Tetrahedron, plane: "XY" | "YZ" | "XZ") {
  try {
    const axis = plane === "XY" ? "z"
      : plane === "YZ" ? "x"
      : "y";

    const pts = [toVec(t.p1), toVec(t.p2), toVec(t.p3), toVec(t.p4)];
    const vals = pts.map(p => p[axis]);

    const pos = vals.filter(v => v > 0).length;
    const neg = vals.filter(v => v < 0).length;

    const total = this.volume(t);

    // нет пересечения
    if (neg === 0) {
      return { intersects: false, v1: total, v2: 0, ratio: Infinity };
    }
    if (pos === 0) {
      return { intersects: false, v1: 0, v2: total, ratio: 0 };
    }

    // есть пересечение
    let Spos = 0;
    let Sneg = 0;

    for (const v of vals) {
      if (v > 0) Spos += v;
      else if (v < 0) Sneg += -v;
    }

    const sum = Spos + Sneg;

    // safety
    if (sum < EPS) {
      return { intersects: true, v1: total / 2, v2: total / 2, ratio: 1 };
    }

    const v2 = total * (Sneg / sum); // нижняя часть
    const v1 = total - v2;

    return { intersects: true, v1, v2, ratio: v2 === 0 ? Infinity : v1 / v2 };

  } catch (err) {
    logger.error({ t, plane, err }, "volumeRatio failed");
    throw new CalculationError("Tetrahedron: volume ratio calculation failed");
  }
}

}
