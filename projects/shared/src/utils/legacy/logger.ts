/**
 * Legacy logger utility - provides basic logging functions.
 * Used internally by schema-renderer and schema-router modules.
 */

const logger = {
  log: (message: string, ...args: unknown[]) => console.log(message, ...args),
  warn: (message: string, ...args: unknown[]) => console.warn(message, ...args),
  error: (message: string, ...args: unknown[]) =>
    console.error(message, ...args),
  debug: (message: string, ...args: unknown[]) =>
    console.debug(message, ...args),
};

export { logger };
