import pino from "pino";
import fs from "fs";
import path from "path";

const isTest = process.env.NODE_ENV === "test";

let logger: pino.Logger;

if (isTest) {
  //  В тестах — отключаем логирование полностью
  logger = pino({ level: "silent" });
} else {
  //  Рабочий логгер — пишет в файл и консоль
  const logDir = path.resolve(__dirname, "logger");
  const logPath = path.join(logDir, "errors.log");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  if (!fs.existsSync(logPath)) {
    fs.writeFileSync(logPath, "");
  }

  logger = pino({
    transport: {
      targets: [
        { target: "pino-pretty", options: { colorize: true } },
        { target: "pino/file", options: { destination: logPath } }
      ]
    }
  });
}

export { logger };
