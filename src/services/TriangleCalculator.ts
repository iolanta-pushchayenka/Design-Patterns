// import { Triangle } from "../entities/TriangleEntity";
// import { Point } from "../entities/Point";
// import { logger } from "../logger/logger";
// import { InvalidDataError } from "../exceptions/InvalidDataError";
// import { CalculationError } from "../exceptions/CalculationError";

// export class TriangleCalculator {

//   private static dist(p: Point, q: Point): number {
//     try {
//       if (!p || !q) {
//         throw new InvalidDataError("Distance: one of the points is undefined");
//       }
//       return Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2);
//     } catch (err) {
//       logger.error({ p, q, err }, "Failed to compute distance");

//       if (err instanceof InvalidDataError) throw err;
//       throw new CalculationError("Failed to compute distance");
//     }
//   }

//   static perimeter(t: Triangle): number {
//     try {
//       if (!t) {
//         throw new InvalidDataError("Perimeter: triangle is undefined");
//       }

//       const ab = this.dist(t.a, t.b);
//       const bc = this.dist(t.b, t.c);
//       const ca = this.dist(t.c, t.a);

//       return ab + bc + ca;
//     } catch (err) {
//       logger.error({ triangle: t, err }, "Failed to compute perimeter");

//       if (err instanceof InvalidDataError) throw err;
//       throw new CalculationError("Failed to compute perimeter");
//     }
//   }

//   // Площадь треугольника 
//   static area(t: Triangle): number {
//     try {
//       if (!t) {
//         throw new InvalidDataError("Area: triangle is undefined");
//       }

//       return Math.abs(
//         t.a.x * (t.b.y - t.c.y) +
//         t.b.x * (t.c.y - t.a.y) +
//         t.c.x * (t.a.y - t.b.y)
//       ) / 2;
//     } catch (err) {
//       logger.error({ triangle: t, err }, "Failed to compute area");

//       if (err instanceof InvalidDataError) throw err;
//       throw new CalculationError("Failed to compute area");
//     }
//   }

//   // Проверка: является ли треугольником 
//   static isValidTriangle(t: Triangle): boolean {
//     try {
//       if (!t) {
//         throw new InvalidDataError("Validation: triangle is undefined");
//       }

//       return this.area(t) > 0;
//     } catch (err) {
//       logger.error({ triangle: t, err }, "Validation error in isValidTriangle");

//       if (err instanceof InvalidDataError) throw err;
//       throw new CalculationError("Failed to validate triangle");
//     }
//   }

//   // Равнобедренный 
//   static isIsosceles(t: Triangle): boolean {
//     try {
//       if (!t) {
//         throw new InvalidDataError("Isosceles check: triangle is undefined");
//       }

//       const d = [
//         this.dist(t.a, t.b),
//         this.dist(t.b, t.c),
//         this.dist(t.c, t.a),
//       ];

//       return (
//         Math.abs(d[0] - d[1]) < 1e-6 ||
//         Math.abs(d[1] - d[2]) < 1e-6 ||
//         Math.abs(d[2] - d[0]) < 1e-6
//       );
//     } catch (err) {
//       logger.error({ triangle: t, err }, "Failed to check isIsosceles");

//       if (err instanceof InvalidDataError) throw err;
//       throw new CalculationError("Failed to check if triangle is isosceles");
//     }
//   }

//   //  Равносторонний 
//   static isEquilateral(t: Triangle): boolean {
//     try {
//       if (!t) {
//         throw new InvalidDataError("Equilateral check: triangle is undefined");
//       }

//       const d = [
//         this.dist(t.a, t.b),
//         this.dist(t.b, t.c),
//         this.dist(t.c, t.a),
//       ];

//       return (
//         Math.abs(d[0] - d[1]) < 1e-6 &&
//         Math.abs(d[1] - d[2]) < 1e-6
//       );
//     } catch (err) {
//       logger.error({ triangle: t, err }, "Failed to check isEquilateral");

//       if (err instanceof InvalidDataError) throw err;
//       throw new CalculationError("Failed to check if triangle is equilateral");
//     }
//   }

//   // Прямоугольный
//   static isRight(t: Triangle): boolean {
//     try {
//       if (!t) {
//         throw new InvalidDataError("Right-angle check: triangle is undefined");
//       }

//       const d = [
//         this.dist(t.a, t.b),
//         this.dist(t.b, t.c),
//         this.dist(t.c, t.a),
//       ]
//         .map(x => x ** 2)
//         .sort((a, b) => a - b);

//       return Math.abs(d[0] + d[1] - d[2]) < 1e-6;
//     } catch (err) {
//       logger.error({ triangle: t, err }, "Failed to check isRight");

//       if (err instanceof InvalidDataError) throw err;
//       throw new CalculationError("Failed to check if triangle is right-angled");
//     }
//   }

//   // Остроугольный 
//   static isAcute(t: Triangle): boolean {
//     try {
//       if (!t) {
//         throw new InvalidDataError("Acute check: triangle is undefined");
//       }

//       const d = [
//         this.dist(t.a, t.b),
//         this.dist(t.b, t.c),
//         this.dist(t.c, t.a),
//       ]
//         .map(x => x ** 2)
//         .sort((a, b) => a - b);

//       return d[0] + d[1] > d[2];
//     } catch (err) {
//       logger.error({ triangle: t, err }, "Failed to check isAcute");

//       if (err instanceof InvalidDataError) throw err;
//       throw new CalculationError("Failed to check if triangle is acute");
//     }
//   }

//   //Тупоугольный 
//   static isObtuse(t: Triangle): boolean {
//     try {
//       if (!t) {
//         throw new InvalidDataError("Obtuse check: triangle is undefined");
//       }

//       const d = [
//         this.dist(t.a, t.b),
//         this.dist(t.b, t.c),
//         this.dist(t.c, t.a),
//       ]
//         .map(x => x ** 2)
//         .sort((a, b) => a - b);

//       return d[0] + d[1] < d[2];
//     } catch (err) {
//       logger.error({ triangle: t, err }, "Failed to check isObtuse");

//       if (err instanceof InvalidDataError) throw err;
//       throw new CalculationError("Failed to check if triangle is obtuse");
//     }
//   }
// }



import { Triangle } from "../entities/TriangleEntity";
import { Point } from "../entities/Point";
import { logger } from "../logger/logger";
import { InvalidDataError } from "../exceptions/InvalidDataError";
import { CalculationError } from "../exceptions/CalculationError";

export class TriangleCalculator {

  // ---------- ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ ----------

  private dist(p: Point, q: Point): number {
    try {
      if (!p || !q) {
        throw new InvalidDataError("Distance: one of the points is undefined");
      }
      return Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2);
    } catch (err) {
      logger.error({ p, q, err }, "Failed to compute distance");

      if (err instanceof InvalidDataError) throw err;
      throw new CalculationError("Failed to compute distance");
    }
  }

  // ---------- ПУБЛИЧНЫЕ МЕТОДЫ ----------

  perimeter(t: Triangle): number {
    try {
      if (!t) {
        throw new InvalidDataError("Perimeter: triangle is undefined");
      }

      const ab = this.dist(t.a, t.b);
      const bc = this.dist(t.b, t.c);
      const ca = this.dist(t.c, t.a);

      return ab + bc + ca;
    } catch (err) {
      logger.error({ triangle: t, err }, "Failed to compute perimeter");

      if (err instanceof InvalidDataError) throw err;
      throw new CalculationError("Failed to compute perimeter");
    }
  }

  area(t: Triangle): number {
    try {
      if (!t) {
        throw new InvalidDataError("Area: triangle is undefined");
      }

      return Math.abs(
        t.a.x * (t.b.y - t.c.y) +
        t.b.x * (t.c.y - t.a.y) +
        t.c.x * (t.a.y - t.b.y)
      ) / 2;
    } catch (err) {
      logger.error({ triangle: t, err }, "Failed to compute area");

      if (err instanceof InvalidDataError) throw err;
      throw new CalculationError("Failed to compute area");
    }
  }

  isValidTriangle(t: Triangle): boolean {
    try {
      if (!t) {
        throw new InvalidDataError("Validation: triangle is undefined");
      }
      return this.area(t) > 0;
    } catch (err) {
      logger.error({ triangle: t, err }, "Validation error in isValidTriangle");

      if (err instanceof InvalidDataError) throw err;
      throw new CalculationError("Failed to validate triangle");
    }
  }

  isIsosceles(t: Triangle): boolean {
    try {
      if (!t) {
        throw new InvalidDataError("Isosceles check: triangle is undefined");
      }

      const d = [
        this.dist(t.a, t.b),
        this.dist(t.b, t.c),
        this.dist(t.c, t.a),
      ];

      return (
        Math.abs(d[0] - d[1]) < 1e-6 ||
        Math.abs(d[1] - d[2]) < 1e-6 ||
        Math.abs(d[2] - d[0]) < 1e-6
      );
    } catch (err) {
      logger.error({ triangle: t, err }, "Failed to check isIsosceles");

      if (err instanceof InvalidDataError) throw err;
      throw new CalculationError("Failed to check if triangle is isosceles");
    }
  }

  isEquilateral(t: Triangle): boolean {
    try {
      if (!t) {
        throw new InvalidDataError("Equilateral check: triangle is undefined");
      }

      const d = [
        this.dist(t.a, t.b),
        this.dist(t.b, t.c),
        this.dist(t.c, t.a),
      ];

      return (
        Math.abs(d[0] - d[1]) < 1e-6 &&
        Math.abs(d[1] - d[2]) < 1e-6
      );
    } catch (err) {
      logger.error({ triangle: t, err }, "Failed to check isEquilateral");

      if (err instanceof InvalidDataError) throw err;
      throw new CalculationError("Failed to check if triangle is equilateral");
    }
  }

  isRight(t: Triangle): boolean {
    try {
      if (!t) {
        throw new InvalidDataError("Right-angle check: triangle is undefined");
      }

      const d = [
        this.dist(t.a, t.b),
        this.dist(t.b, t.c),
        this.dist(t.c, t.a),
      ]
        .map(x => x ** 2)
        .sort((a, b) => a - b);

      return Math.abs(d[0] + d[1] - d[2]) < 1e-6;
    } catch (err) {
      logger.error({ triangle: t, err }, "Failed to check isRight");

      if (err instanceof InvalidDataError) throw err;
      throw new CalculationError("Failed to check if triangle is right-angled");
    }
  }

  isAcute(t: Triangle): boolean {
    try {
      if (!t) {
        throw new InvalidDataError("Acute check: triangle is undefined");
      }

      const d = [
        this.dist(t.a, t.b),
        this.dist(t.b, t.c),
        this.dist(t.c, t.a),
      ]
        .map(x => x ** 2)
        .sort((a, b) => a - b);

      return d[0] + d[1] > d[2];
    } catch (err) {
      logger.error({ triangle: t, err }, "Failed to check isAcute");

      if (err instanceof InvalidDataError) throw err;
      throw new CalculationError("Failed to check if triangle is acute");
    }
  }

  isObtuse(t: Triangle): boolean {
    try {
      if (!t) {
        throw new InvalidDataError("Obtuse check: triangle is undefined");
      }

      const d = [
        this.dist(t.a, t.b),
        this.dist(t.b, t.c),
        this.dist(t.c, t.a),
      ]
        .map(x => x ** 2)
        .sort((a, b) => a - b);

      return d[0] + d[1] < d[2];
    } catch (err) {
      logger.error({ triangle: t, err }, "Failed to check isObtuse");

      if (err instanceof InvalidDataError) throw err;
      throw new CalculationError("Failed to check if triangle is obtuse");
    }
  }
}
