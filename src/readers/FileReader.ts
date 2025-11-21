

// // src/utils/FileReader.ts
// import fs from "fs";
// import pathModule from "path";
// import { TriangleFactory } from "../factories/TriangleFactory";
// import { TetrahedronFactory } from "../factories/TetrahedronFactory";
// import { TriangleValidator } from "../services/TriangleValidator";
// import { TetrahedronValidator } from "../services/TetrahedronValidator";
// import { InvalidDataError } from "../exceptions/InvalidDataError";
// import { logger } from "../logger/logger";

// // Каталог, в котором разрешено хранить файлы с данными
// const BASE_DIR = pathModule.resolve("data");

// export class FileReader {
//   /**
//    * Проверяет, что путь к файлу расположен внутри BASE_DIR
//    */
//   private static safeResolve(userPath: string): string {
//     const resolved = pathModule.resolve(userPath);

//     if (!resolved.startsWith(BASE_DIR)) {
//       throw new InvalidDataError(
//         `Запрещено читать файлы вне каталога "${BASE_DIR}". Получен путь: "${userPath}".`
//       );
//     }

//     return resolved;
//   }

//   static readTriangles(path: string) {
//     const result: any[] = [];
//     const validator = new TriangleValidator();
//     let id = 1;

//     try {
//       const safePath = FileReader.safeResolve(path);
//       const raw = fs.readFileSync(safePath, "utf8");
//       const lines = raw.split("\n");

//       for (const rawLine of lines) {
//         const row = rawLine.trim();
//         if (!row) continue;

//         try {
//           const nums = validator.parseRow(row);
//           const points = validator.buildPoints(nums);
//           validator.validatePoints(points);

//           const triangle = TriangleFactory.create(`T${id}`, nums);
//           result.push(triangle);
//           id++;
//         } catch (err: any) {
//           logger.warn({ row, err: err.message }, "Triangle: пропуск строки");
//           continue;
//         }
//       }
//     } catch (err: any) {
//       throw new InvalidDataError(
//         `Ошибка чтения файла "${path}": ${err?.message || err}`
//       );
//     }

//     return result;
//   }

//   static readTetrahedrons(path: string) {
//     const result: any[] = [];
//     const validator = new TetrahedronValidator();
//     let id = 1;

//     try {
//       const safePath = FileReader.safeResolve(path);
//       const raw = fs.readFileSync(safePath, "utf8");
//       const lines = raw.split("\n");

//       for (const rawLine of lines) {
//         const row = rawLine.trim();
//         if (!row) continue;

//         try {
//           const nums = validator.parseRow(row);
//           const points = validator.buildPoints(nums);
//           validator.validatePoints(points);

//           const tetra = TetrahedronFactory.create(`S${id}`, nums);
//           result.push(tetra);
//           id++;
//         } catch (err: any) {
//           logger.warn({ row, err: err.message }, "Tetra: пропуск строки");
//           continue;
//         }
//       }
//     } catch (err: any) {
//       throw new InvalidDataError(
//         `Ошибка чтения файла "${path}": ${err?.message || err}`
//       );
//     }

//     return result;
//   }
// }




// src/utils/FileReader.ts
import fs from "fs";
import pathModule from "path";
import { TriangleFactory } from "../factories/TriangleFactory";
import { TetrahedronFactory } from "../factories/TetrahedronFactory";
import { TriangleValidator } from "../services/TriangleValidator";
import { TetrahedronValidator } from "../services/TetrahedronValidator";
import { InvalidDataError } from "../exceptions/InvalidDataError";
import { logger } from "../logger/logger";

// Каталог, в котором разрешено хранить файлы с данными
const BASE_DIR = pathModule.resolve("data");

export class FileReader {
  /**
   * Проверяет, что путь к файлу расположен внутри BASE_DIR
   */
  private static safeResolve(userPath: string): string {
    try {
      const resolved = pathModule.resolve(userPath);

      if (!resolved.startsWith(BASE_DIR)) {
        throw new InvalidDataError(
          `Forbidden path: file must be inside "${BASE_DIR}", but got "${userPath}"`
        );
      }

      return resolved;
    } catch (err: any) {
      logger.error({ userPath, err }, "safeResolve failed");

      if (err instanceof InvalidDataError) throw err;
      throw new InvalidDataError("Failed to resolve file path");
    }
  }

  // ---------------- TRIANGLES ----------------

  static readTriangles(path: string) {
    const result: any[] = [];
    const validator = new TriangleValidator();
    let id = 1;

    try {
      const safePath = FileReader.safeResolve(path);

      let raw: string;
      try {
        raw = fs.readFileSync(safePath, "utf8");
      } catch (fsErr: any) {
        throw new InvalidDataError(
          `Cannot read triangle file "${path}": ${fsErr.message}`
        );
      }

      const lines = raw.split("\n");

      for (const rawLine of lines) {
        const row = rawLine.trim();
        if (!row) continue;

        try {
          const nums = validator.parseRow(row);
          const points = validator.buildPoints(nums);
          validator.validatePoints(points);

          const triangle = TriangleFactory.create(`T${id}`, nums);
          result.push(triangle);
          id++;
        } catch (err: any) {
          logger.warn({ row, err: err.message }, "Triangle: skipping row");
          continue;
        }
      }
    } catch (err: any) {
      logger.error({ path, err }, "readTriangles failed");

      if (err instanceof InvalidDataError) throw err;
      throw new InvalidDataError(
        `Unexpected error reading triangles from "${path}"`
      );
    }

    return result;
  }

  // ---------------- TETRAHEDRONS ----------------

  static readTetrahedrons(path: string) {
    const result: any[] = [];
    const validator = new TetrahedronValidator();
    let id = 1;

    try {
      const safePath = FileReader.safeResolve(path);

      let raw: string;
      try {
        raw = fs.readFileSync(safePath, "utf8");
      } catch (fsErr: any) {
        throw new InvalidDataError(
          `Cannot read tetrahedron file "${path}": ${fsErr.message}`
        );
      }

      const lines = raw.split("\n");

      for (const rawLine of lines) {
        const row = rawLine.trim();
        if (!row) continue;

        try {
          const nums = validator.parseRow(row);
          const points = validator.buildPoints(nums);
          validator.validatePoints(points);

          const tetra = TetrahedronFactory.create(`S${id}`, nums);
          result.push(tetra);
          id++;
        } catch (err: any) {
          logger.warn({ row, err: err.message }, "Tetra: skipping row");
          continue;
        }
      }
    } catch (err: any) {
      logger.error({ path, err }, "readTetrahedrons failed");

      if (err instanceof InvalidDataError) throw err;
      throw new InvalidDataError(
        `Unexpected error reading tetrahedrons from "${path}"`
      );
    }

    return result;
  }
}
