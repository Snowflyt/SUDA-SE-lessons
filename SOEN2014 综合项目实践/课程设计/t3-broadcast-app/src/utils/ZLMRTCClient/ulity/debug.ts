let logger: (...args: unknown[]) => void;
let errorLogger: (...args: unknown[]) => void;

export const setDebugLogger = () => {
  logger = console.log;
  errorLogger = console.error;
};

export const debug = {
  isEnabled() {
    return logger != null;
  },
  log(message: unknown, ...optionalParams: unknown[]) {
    if (logger) {
      logger(message, ...optionalParams);
    }
  },
  error(message: unknown, ...optionalParams: unknown[]) {
    if (errorLogger) {
      errorLogger(message, ...optionalParams);
    }
  },
};
