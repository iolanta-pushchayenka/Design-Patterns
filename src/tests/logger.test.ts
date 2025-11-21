import path from "path";

describe("logger module", () => {
  const ORIGINAL_ENV = process.env.NODE_ENV;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env.NODE_ENV = ORIGINAL_ENV;
  });

  // ------------------- TEST 1 --------------------
  test("создаёт тихий логгер при NODE_ENV=test", () => {
    process.env.NODE_ENV = "test";

    const mockPino = jest.fn(() => ({}));

    jest.mock("pino", () => mockPino);
    jest.mock("fs", () => ({
      existsSync: jest.fn(),
      mkdirSync: jest.fn(),
      writeFileSync: jest.fn()
    }));

    const { logger } = require("../logger/logger");

    expect(mockPino).toHaveBeenCalledWith({ level: "silent" });
    expect(logger).toBeDefined();
  });

  // ------------------- TEST 2 --------------------
  test("создаёт рабочий логгер при NODE_ENV!=test", () => {
    process.env.NODE_ENV = "production";

    const mockPino = jest.fn(() => ({}));
    const existsMock = jest.fn()
      .mockReturnValueOnce(false)  // dir
      .mockReturnValueOnce(false); // file

    const mkdirMock = jest.fn();
    const writeMock = jest.fn();

    jest.mock("pino", () => mockPino);
    jest.mock("fs", () => ({
      existsSync: existsMock,
      mkdirSync: mkdirMock,
      writeFileSync: writeMock
    }));

    const { logger } = require("../logger/logger");

    const logDir = path.resolve(__dirname, "../logger/logger");
    const logPath = path.join(logDir, "errors.log");

    expect(existsMock).toHaveBeenCalledWith(logDir);
    expect(mkdirMock).toHaveBeenCalledWith(logDir, { recursive: true });

    expect(existsMock).toHaveBeenCalledWith(logPath);
    expect(writeMock).toHaveBeenCalledWith(logPath, "");

    expect(mockPino).toHaveBeenCalled();
    expect(logger).toBeDefined();
  });

  // ------------------- TEST 3 --------------------
  test("если директория существует — не создаёт её", () => {
    process.env.NODE_ENV = "production";

    const mockPino = jest.fn(() => ({}));

    const existsMock = jest.fn()
      .mockReturnValueOnce(true)  // dir exists
      .mockReturnValueOnce(false); // file not exists

    const mkdirMock = jest.fn();
    const writeMock = jest.fn();

    jest.mock("pino", () => mockPino);
    jest.mock("fs", () => ({
      existsSync: existsMock,
      mkdirSync: mkdirMock,
      writeFileSync: writeMock
    }));

    require("../logger/logger");

    expect(mkdirMock).not.toHaveBeenCalled();
    expect(writeMock).toHaveBeenCalled();
  });

  // ------------------- TEST 4 --------------------
  test("если файл существует — не создаёт его", () => {
    process.env.NODE_ENV = "production";

    const mockPino = jest.fn(() => ({}));

    const existsMock = jest.fn()
      .mockReturnValueOnce(true) // dir exists
      .mockReturnValueOnce(true); // file exists

    const mkdirMock = jest.fn();
    const writeMock = jest.fn();

    jest.mock("pino", () => mockPino);
    jest.mock("fs", () => ({
      existsSync: existsMock,
      mkdirSync: mkdirMock,
      writeFileSync: writeMock
    }));

    const { logger } = require("../logger/logger");

    expect(mkdirMock).not.toHaveBeenCalled();
    expect(writeMock).not.toHaveBeenCalled();
    expect(logger).toBeDefined();
  });
});
