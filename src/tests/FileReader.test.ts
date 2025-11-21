import fs from "fs";
import path from "path";

import { FileReader } from "../readers/FileReader";
import { InvalidDataError } from "../exceptions/InvalidDataError";

import { TriangleFactory } from "../factories/TriangleFactory";
import { TetrahedronFactory } from "../factories/TetrahedronFactory";

import { TriangleValidator } from "../services/TriangleValidator";
import { TetrahedronValidator } from "../services/TetrahedronValidator";

jest.mock("fs");
jest.mock("../../src/factories/TriangleFactory");
jest.mock("../../src/factories/TetrahedronFactory");
jest.mock("../../src/services/TriangleValidator");
jest.mock("../../src/services/TetrahedronValidator");

const BASE_DIR = path.resolve("data");

describe("FileReader", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("safeResolve", () => {
        test("разрешает путь внутри data/", () => {
            const userPath = path.join(BASE_DIR, "file.txt");


            const resolved = (FileReader as any).safeResolve(userPath);

            expect(resolved).toBe(path.resolve(userPath));
        });

        test("бросает ошибку, если путь вне data/", () => {
            const userPath = "/etc/passwd";

            expect(() => (FileReader as any).safeResolve(userPath))
                .toThrow(InvalidDataError);
        });
    });


    describe("readTriangles", () => {

        test("успешно читает корректные строки", () => {
            (fs.readFileSync as jest.Mock).mockReturnValue("1 2 3 4 5 6\n7 8 9 10 11 12");

            const parseMock = jest.fn()
                .mockReturnValueOnce([1, 2, 3, 4, 5, 6])
                .mockReturnValueOnce([7, 8, 9, 10, 11, 12]);

            const buildMock = jest.fn()
                .mockReturnValue([{}, {}, {}])
                .mockReturnValue([{}, {}, {}]);

            const validateMock = jest.fn();

            (TriangleValidator as any).mockImplementation(() => ({
                parseRow: parseMock,
                buildPoints: buildMock,
                validatePoints: validateMock
            }));

            (TriangleFactory.create as jest.Mock)
                .mockReturnValueOnce({ id: "T1" })
                .mockReturnValueOnce({ id: "T2" });

            const res = FileReader.readTriangles(path.join(BASE_DIR, "tri.txt"));

            expect(res).toHaveLength(2);
            expect(res[0]).toEqual({ id: "T1" });
            expect(res[1]).toEqual({ id: "T2" });
        });

        test("пропускает строки с ошибками", () => {
            (fs.readFileSync as jest.Mock).mockReturnValue("GOOD\nBAD");

            const parseMock = jest.fn()
                .mockReturnValueOnce([1, 2, 3, 4, 5, 6])   // OK
                .mockImplementationOnce(() => {      // BAD
                    throw new InvalidDataError("bad row");
                });

            const buildMock = jest.fn().mockReturnValue([{}, {}, {}]);
            const validateMock = jest.fn();

            (TriangleValidator as any).mockImplementation(() => ({
                parseRow: parseMock,
                buildPoints: buildMock,
                validatePoints: validateMock
            }));

            (TriangleFactory.create as jest.Mock)
                .mockReturnValueOnce({ id: "T1" });

            const res = FileReader.readTriangles(path.join(BASE_DIR, "tri.txt"));

            expect(res).toHaveLength(1);
            expect(res[0]).toEqual({ id: "T1" });
        });

        test("бросает ошибку, если файл не читается", () => {
            (fs.readFileSync as jest.Mock).mockImplementation(() => {
                throw new Error("no file");
            });

            expect(() => FileReader.readTriangles(path.join(BASE_DIR, "absent.txt")))
                .toThrow(InvalidDataError);
        });
    });

    describe("readTetrahedrons", () => {

        test("успешно читает корректные строки", () => {
            (fs.readFileSync as jest.Mock).mockReturnValue("1 2 3 4 5 6 7 8 9 10 11 12");

            const parseMock = jest.fn().mockReturnValue([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
            const buildMock = jest.fn().mockReturnValue([{}, {}, {}, {}]);
            const validateMock = jest.fn();

            (TetrahedronValidator as any).mockImplementation(() => ({
                parseRow: parseMock,
                buildPoints: buildMock,
                validatePoints: validateMock
            }));

            (TetrahedronFactory.create as jest.Mock)
                .mockReturnValueOnce({ id: "S1" });

            const res = FileReader.readTetrahedrons(path.join(BASE_DIR, "tetra.txt"));

            expect(res).toHaveLength(1);
            expect(res[0]).toEqual({ id: "S1" });
        });

        test("пропускает ошибочные строки", () => {
            (fs.readFileSync as jest.Mock).mockReturnValue("GOOD\nBAD");

            const parseMock = jest.fn()
                .mockReturnValueOnce(new Array(12).fill(1)) // OK
                .mockImplementationOnce(() => {
                    throw new InvalidDataError("bad tetra");
                });

            const buildMock = jest.fn().mockReturnValue([{}, {}, {}, {}]);
            const validateMock = jest.fn();

            (TetrahedronValidator as any).mockImplementation(() => ({
                parseRow: parseMock,
                buildPoints: buildMock,
                validatePoints: validateMock
            }));

            (TetrahedronFactory.create as jest.Mock)
                .mockReturnValueOnce({ id: "S1" });

            const res = FileReader.readTetrahedrons(path.join(BASE_DIR, "tetra.txt"));

            expect(res).toHaveLength(1);
            expect(res[0]).toEqual({ id: "S1" });
        });

        test("бросает ошибку при ошибке чтения файла", () => {
            (fs.readFileSync as jest.Mock).mockImplementation(() => {
                throw new Error("cannot read");
            });

            expect(() =>
                FileReader.readTetrahedrons(path.join(BASE_DIR, "bad.txt"))
            ).toThrow(InvalidDataError);
        });

    });
});
