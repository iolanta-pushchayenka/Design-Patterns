import pino from "pino";
export const logger = pino({
    transport: {
        targets: [
            { target: "pino-pretty", level: "info" },
            {
                target: "pino/file",
                level: "error",
                options: { destination: "logs/errors.log" }
            }
        ]
    }
});
