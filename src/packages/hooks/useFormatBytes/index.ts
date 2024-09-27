import { isNumeric } from '../../is/isNumber';

/**
 * 字节单位转换 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'
 * @param value
 * @param decimal
 * @example
 * ```js
 * useFormatBytes(123456789012345) // 112.28 TB
 * useFormatBytes(1048576) // 1 MB
 * useFormatBytes(0) // 0 Bytes
 * useFormatBytes(104857610485761048576104857610485761048576) // Number too large
 * ```
 */
export const useFormatBytes = (value: number, decimal = 2) => {
  if (!isNumeric(value)) return value;
  const _value = +value;
  if (_value <= 0) {
    return '0 Bytes';
  }

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const k = 1024;
  const dm = decimal < 0 ? 0 : decimal;
  const i = Math.floor(Math.log(_value) / Math.log(k));
  if (i >= sizes.length) {
    return 'Number too large';
  }
  if (!sizes[i]) return value + '';
  return parseFloat((_value / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
