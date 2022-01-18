import winston from "winston";
import Config from "@utils/Config";

export const logger = winston.createLogger({
  silent: Config.debug,
  level: Config.logging.level,
  exitOnError: false,
});

export function error(
  context: string,
  message: string,
  scope: string,
  data = ""
): void {
  logger.error(message, {
    label: Config.logging.label,
    context,
    scope,
    data,
  });
}

export function warn(
  context: string,
  message: string,
  scope: string,
  data = ""
): void {
  logger.warn(message, {
    label: Config.logging.label,
    context,
    scope,
    data,
  });
}

export function info(
  context: string,
  message: string,
  scope: string,
  data = ""
): void {
  logger.info(message, {
    label: Config.logging.label,
    context,
    scope,
    data,
  });
}

export function http(
  context: string,
  message: string,
  scope: string,
  data = ""
): void {
  logger.http(message, {
    label: Config.logging.label,
    context,
    scope,
    data,
  });
}

export function verbose(
  context: string,
  message: string,
  scope: string,
  data = ""
): void {
  logger.verbose(message, {
    label: Config.logging.label,
    context,
    scope,
    data,
  });
}

export function debug(
  context: string,
  message: string,
  scope: string,
  data = ""
): void {
  logger.debug(message, {
    label: Config.logging.label,
    context,
    scope,
    data,
  });
}
