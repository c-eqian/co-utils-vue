/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-12-04 19:57:46
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-04 20:06:22
 */
import type { App, AppContext, Plugin } from 'vue'; // 只是导入类型不是导入App的值

// 类型必须导出否则生成不了.d.ts文件
export type UseSFCWithInstall<T> = T & Plugin;

export type UseSFCInstallWithContext<T> = UseSFCWithInstall<T> & {
  _context: AppContext | null;
};
export type SFC = {
  name: string;
};
/**
 * 定义一个withInstall方法处理以下组件类型问题
 * @param comp
 */
export const useSFCWithInstall = <T extends SFC>(comp: T) => {
  (comp as UseSFCWithInstall<T>).install = (app: App) => {
    app.component(comp.name, comp);
  };
  return comp as UseSFCWithInstall<T>;
};

export const useSFCWithInstallFunction = <T>(fn: T, name: string) => {
  (fn as UseSFCWithInstall<T>).install = (app: App) => {
    (fn as UseSFCInstallWithContext<T>)._context = app._context;
    app.config.globalProperties[name] = fn;
  };
  return fn as UseSFCInstallWithContext<T>;
};
