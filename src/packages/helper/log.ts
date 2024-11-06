const COLOR = {
  black: '#00000',
  red: '#FF0000',
  green: '#008000',
  yellow: '#FFFF00',
  blue: '#0000FF',
  magenta: '#FF00FF',
  cyan: '#00FFFF',
  white: '#FFFFFF'
};

type ColorType = keyof typeof COLOR;
type LogBaseFn = (message: string, isBlock?: boolean) => void;
type LogLevel = 'log' | 'warn' | 'error' | 'wait' | 'ready' | 'info' | 'event';
type ChalkLog = Record<ColorType, LogBaseFn> & Record<LogLevel, LogBaseFn>;
// 日志级别对应样式
const LOGLEVEL: Record<LogLevel, ColorType> = {
  log: 'black',
  wait: 'cyan',
  error: 'red',
  warn: 'yellow',
  ready: 'green',
  info: 'blue',
  event: 'magenta'
};
const baseLog = (message: string, color: ColorType, isBlock?: boolean, level?: LogLevel) => {
  const { log } = console;
  if (isBlock) {
    log(
      `%c ${level?.toUpperCase()} %c ${message} `,
      'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;',
      'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;'
    );
    return;
  }
  log(`%c${message}`, `color: ${COLOR[color]}`);
};
export const chalkLog = (): ChalkLog => {
  const baseColorKeys = Object.keys(COLOR) as ColorType[];
  const logLevel = Object.entries(LOGLEVEL);
  const logMap = {} as ChalkLog;
  baseColorKeys.forEach(key => {
    logMap[key] = (message: string) => baseLog(message, key);
  });
  logLevel.forEach(([k, c]) => {
    logMap[k as LogLevel] = (message: string, isBlock) =>
      baseLog(message, c, isBlock, k as LogLevel);
  });
  return {
    ...logMap
  };
};
