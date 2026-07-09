export class LoggerService {
    _logs = [];
    get logs() {
        return this._logs;
    }
    log(level, message, context) {
        const entry = {
            timestamp: new Date(),
            level,
            message,
            context,
        };
        this._logs.push(entry);
        this.writeToConsole(entry);
    }
    debug(message, context) {
        this.log("debug", message, context);
    }
    info(message, context) {
        this.log("info", message, context);
    }
    warn(message, context) {
        this.log("warn", message, context);
    }
    error(message, context) {
        this.log("error", message, context);
    }
    getFilteredLogs(level) {
        if (!level)
            return [...this._logs];
        return this._logs.filter((log) => log.level === level);
    }
    exportLogs() {
        return JSON.stringify(this._logs, null, 2);
    }
    clear() {
        this._logs = [];
    }
    writeToConsole(entry) {
        const prefix = `[${entry.timestamp.toISOString()}] [${entry.level.toUpperCase()}]`;
        const contextStr = entry.context ? ` [${entry.context}]` : "";
        const fullMessage = `${prefix}${contextStr} ${entry.message}`;
        switch (entry.level) {
            case "debug":
                console.debug(fullMessage);
                break;
            case "info":
                console.info(fullMessage);
                break;
            case "warn":
                console.warn(fullMessage);
                break;
            case "error":
                console.error(fullMessage);
                break;
        }
    }
}
