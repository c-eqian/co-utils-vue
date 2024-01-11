import { isNumber } from '../../is/isNumber';
import { isString } from '../../is/isString';
export const useFormValueWatcher = <T>(targets: T, origins: T) => {
  const formValueDiff = <P>(target: P, origin: P) => {
    if (isString(target) || isNumber(target)) {
      /**
       * 处理数值或者字符串数据类型
       */
      if (isString(origin) || isNumber(origin)) {
        const _t = Number.isNaN(+target) ? target : +target;
        const _o = Number.isNaN(+origin) ? origin : +origin;
        if (_t !== _o) {
          return true;
        }
      }
    } else if (toString.call(target) === '[object Date]') {
      if (toString.call(origin) !== '[object Date]' || target !== origin) {
        return true;
      }
    } else if (toString.call(target) === '[object Boolean]') {
      if (toString.call(origin) !== '[object Boolean]' || target !== origin) {
        return true;
      }
    } else {
      /**
       * 处理对象数据类型
       */
      if (Array.isArray(target) || toString.call(target) === '[object Object]') {
        if (Array.isArray(target)) {
          if (!Array.isArray(origin)) {
            return true;
          }
          if (target.length !== origin.length) {
            return true;
          }
        }
        if (toString.call(target) === '[object Object]') {
          if (toString.call(origin) !== '[object Object]') {
            return true;
          }
        }
        for (let item in target) {
          if (formValueDiff(target[item], origin[item])) {
            return true;
          }
        }
      }
    }
    return false;
  };
  return formValueDiff(targets, origins);
};
