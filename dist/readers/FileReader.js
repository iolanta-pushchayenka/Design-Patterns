import fs from "fs";
import { logger } from "../logger/logger";
import { TriangleValidator } from "../services/TriangleValidator";
import { TetrahedronValidator } from "../services/TetrahedronValidator";
import { TriangleFactory } from "../factories/TriangleFactory";
import { TetrahedronFactory } from "../factories/TetrahedronFactory";
export class FileReader {
    static readTriangles(path) {
        const lines = fs.readFileSync(path, "utf8").trim().split("\n");
        const list = [];
        let id = 1;
        for (const row of lines) {
            if (!TriangleValidator.validateRawString(row)) {
                logger.error(`Invalid: ${row}`);
                continue;
            }
            const nums = row.split(/\s+/).map(Number);
            list.push(TriangleFactory.create(`T${id}`, nums));
            id++;
        }
        return list;
    }
    static readTetrahedrons(path) {
        const lines = fs.readFileSync(path, "utf8").trim().split("\n");
        const list = [];
        let id = 1;
        for (const row of lines) {
            if (!TetrahedronValidator.validateRawString(row)) {
                logger.error(`Invalid: ${row}`);
                continue;
            }
            const nums = row.split(/\s+/).map(Number);
            list.push(TetrahedronFactory.create(`S${id}`, nums));
            id++;
        }
        return list;
    }
}
