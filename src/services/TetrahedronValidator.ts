// import { Point } from "../entities/Point";

// // Регулярное выражение проверяет, что строка состоит ровно из 12 чисел
// export const TETRA_ROW_REGEX =
//   /^-?\d+(\.\d+)?(\s+-?\d+(\.\d+)?){11}$/;

// export class TetrahedronValidator {

//   /**
//    * Проверка, что исходная строка содержит корректные 12 чисел.
//    */
//   static validateRawString(row: string): boolean {
//     return TETRA_ROW_REGEX.test(row.trim());
//   }

//   /**
//    * Проверяет, что все 4 точки различны.
//    * Если две точки совпадают — тетраэдр некорректен.
//    */
//   static noDuplicatePoints(points: Point[]): boolean {
//     const set = new Set(points.map(p => `${p.x}_${p.y}_${p.z}`));
//     return set.size === points.length;
//   }

//   /**
//    * Проверка невырожденности тетраэдра.
//    * Фактически — проверяем, что объём ≠ 0.
//    * Это делается через смешанное произведение векторов (det != 0).
//    */
//   static isNonDegenerate(a: Point, b: Point, c: Point, d: Point): boolean {
//     const v1 = this.vec(a, b); // AB
//     const v2 = this.vec(a, c); // AC
//     const v3 = this.vec(a, d); // AD

//     const cross = this.cross(v1, v2); // векторное произведение AB × AC
//     const det = this.dot(cross, v3);  // смешанное произведение (AB × AC) ⋅ AD

//     return Math.abs(det) > 1e-6; // нулевой det → тетраэдр вырожден
//   }

//   /**
//    * Полная проверка 4 точек:
//    * - нет совпадающих вершин
//    * - тетраэдр имеет объем > 0
//    */
//   static validatePoints(a: Point, b: Point, c: Point, d: Point): boolean {
//     return (
//       this.noDuplicatePoints([a, b, c, d]) &&
//       this.isNonDegenerate(a, b, c, d)
//     );
//   }

//   /**
//    * Вспомогательный метод: построение вектора PQ.
//    */
//   private static vec(p: Point, q: Point) {
//     return { x: q.x - p.x, y: q.y - p.y, z: q.z - p.z };
//   }

//   /**
//    * Вспомогательный метод: векторное произведение.
//    */
//   private static cross(a: any, b: any) {
//     return {
//       x: a.y * b.z - a.z * b.y,
//       y: a.z * b.x - a.x * b.z,
//       z: a.x * b.y - a.y * b.x
//     };
//   }

//   /**
//    * Вспомогательный метод: скалярное произведение.
//    */
//   private static dot(a: any, b: any) {
//     return a.x * b.x + a.y * b.y + a.z * b.z;
//   }
// }






// src/validators/TetrahedronValidator.ts
import { Point } from "../entities/Point";
import { InvalidDataError } from "../exceptions/InvalidDataError";
import { logger } from "../logger/logger";

// Разрешаем только корректные числа (-1, 2.5, 0.002)
export const TETRA_ROW_PATTERN =
  /^-?\d+(?:\.\d+)?(?:\s+-?\d+(?:\.\d+)?)*$/;

// Количество значений: 4 точки × 3 координаты = 12
export const TETRA_COORD_COUNT = 12;

export class TetrahedronValidator {
  /**
   * Парсит строку данных тетраэдра.
   * Выполняет проверку регуляркой, длиной, NaN и автодополнением.
   */
  parseRow(row: string): number[] {
    try {
      const clean = row.trim();

      // Недопустимые символы
      if (!TETRA_ROW_PATTERN.test(clean)) {
        logger.error({ row }, "Tetra: строка содержит недопустимые символы");
        throw new InvalidDataError("Tetra: строка содержит неверные символы");
      }

      const numbers = clean.split(/\s+/).map(v => Number(v));

      // NaN после парсинга — ошибка
      if (numbers.some(n => Number.isNaN(n))) {
        logger.error({ row }, "Tetra: получены NaN");
        throw new InvalidDataError("Tetra: найдены нечисловые значения");
      }

      // Меньше 12 — дополняем значениями 1 (требование задания)
      const result: number[] = [...numbers];
      while (result.length < TETRA_COORD_COUNT) {
        result.push(1);
      }

      // Больше 12 — ошибка
      if (result.length > TETRA_COORD_COUNT) {
        logger.error({ row }, "Tetra: слишком много чисел");
        throw new InvalidDataError("Tetra: превышено количество координат");
      }

      return result;
    } catch (err: any) {
      if (err instanceof InvalidDataError) {
        throw err;
      }

      logger.error({ row, err }, "Tetra: ошибка обработки строки");
      throw new InvalidDataError("Tetra: ошибка разбора строки");
    }
  }

  /**
   * Создаёт 4 точки тетраэдра из массива чисел.
   */
   buildPoints(nums: number[]): Point[] {
    try {
      // ВАЛИДАЦИЯ ДЛИНЫ! Без неё тест никогда не пройдёт
      if (nums.length !== TETRA_COORD_COUNT) {
        logger.error({ nums }, "Tetra: неверное количество координат");
        throw new InvalidDataError(
          "Tetra: требуется 12 координат для построения точек"
        );
      }

      return [
        new Point(nums[0], nums[1], nums[2]),
        new Point(nums[3], nums[4], nums[5]),
        new Point(nums[6], nums[7], nums[8]),
        new Point(nums[9], nums[10], nums[11]),
      ];
    } catch (err: any) {
      logger.error({ nums, err }, "Tetra: ошибка создания точек");
      throw new InvalidDataError("Tetra: невозможно создать точки");
    }
  }

  /**
   * Проверяет корректность набора точек тетраэдра.
   */
  validatePoints(points: Point[]): void {
    if (points.length !== 4) {
      throw new InvalidDataError("Tetra: требуется 4 точки");
    }

    this.ensureNoDuplicatePoints(points);
    this.ensureNonZeroVolume(points);
  }

  /**
   * Проверяет отсутствие совпадающих точек.
   */
  private ensureNoDuplicatePoints(points: Point[]): void {
    const unique = new Set(points.map(p => `${p.x}_${p.y}_${p.z}`));

    if (unique.size !== points.length) {
      logger.error({ points }, "Tetra: совпадающие точки");
      throw new InvalidDataError("Tetra: точки совпадают");
    }
  }

  /**
   * Проверяет, что тетраэдр не вырожден (объём ≠ 0).
   */
  private ensureNonZeroVolume([a, b, c, d]: Point[]): void {
    const vol = this.mixedProduct(a, b, c, d);

    if (Math.abs(vol) <= 1e-9) {
      logger.error({ a, b, c, d }, "Tetra: объём равен нулю");
      throw new InvalidDataError("Tetra: точки лежат в одной плоскости");
    }
  }

  /**
   * Смешанное произведение (объём × 6).
   */
  private mixedProduct(a: Point, b: Point, c: Point, d: Point): number {
    const ab = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
    const ac = { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z };
    const ad = { x: d.x - a.x, y: d.y - a.y, z: d.z - a.z };

    // Векторное произведение AB × AC
    const cross = {
      x: ab.y * ac.z - ab.z * ac.y,
      y: ab.z * ac.x - ab.x * ac.z,
      z: ab.x * ac.y - ab.y * ac.x,
    };

    // Скалярное произведение (AB × AC) · AD
    return cross.x * ad.x + cross.y * ad.y + cross.z * ad.z;
  }
}
