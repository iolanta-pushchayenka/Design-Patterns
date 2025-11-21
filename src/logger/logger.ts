// import pino from "pino";
// import fs from "fs";
// import path from "path";

// // Путь к файлу логов в папке logger
// const logDir = path.resolve(__dirname, "logger");
// const logPath = path.join(logDir, "errors.log");

// // Проверка, существует ли папка logger, если нет — создаём её
// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir, { recursive: true });  // Создаём папку, если её нет
// }

// // Проверка, существует ли файл логов, если нет — создаём его
// if (!fs.existsSync(logPath)) {
//   fs.writeFileSync(logPath, '');  // Создаём пустой файл, если он не существует
// }

// // Конфигурация pino
// export const logger = pino({
//   transport: {
//     targets: [
//       { target: "pino-pretty", options: { colorize: true } },
//       { target: "pino/file", options: { destination: logPath } } // Записываем логи в errors.log
//     ]
//   }
// });



import pino from "pino";
import fs from "fs";
import path from "path";

const isTest = process.env.NODE_ENV === "test";

let logger: pino.Logger;

if (isTest) {
  // 🔇 В тестах — отключаем логирование полностью
  logger = pino({ level: "silent" });
} else {
  // 📁 Рабочий логгер — пишет в файл и консоль
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
