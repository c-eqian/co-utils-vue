/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-12-04 19:47:25
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-04 19:55:03
 */
import { cst } from '@/packages/constants';
import { ref, computed, unref } from 'vue';

/**
 * 组件名转换 CzButton => cz-button
 * @param cname
 * @returns
 */
export const useComponentNameFormat = (cname: string): string => {
  if (!cname.startsWith(cst.COMPONENT_NAMESPACE_PREFIX)) return cname;
  const compName = cname.toLowerCase();
  return `${cst.NAMESPACE_PREFIX}-${compName.replace(cst.NAMESPACE_PREFIX, '')}`;
};

/**
 * 全局z-index
 */
const globalZIndex = ref<number>(cst.INITIAL_GLOBAL_Z_INDEX);
/**
 * 全局id
 */
const globalId = ref<number>(cst.INITIAL_ID);

/** 全局 z-index 自动自增 */
export const getNextGlobalZIndex = () => {
  return globalZIndex.value + 1;
};

/** 全局 z-index 自动Id */
export const getNextGlobalId = () => globalId.value + 1;

/** 设置全局 z-index */
export const setGlobalZIndex = (val: number) => {
  globalZIndex.value = val;
};

/**
 * 短杆拼接转大写
 * @param str
 * @returns
 * test-icon => testIcon
 */
export const camelize = (str: string): string => {
  return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
};

/**
 * 首字母转大写
 * @param str
 * @returns
 */
export function firstLetterToUpperCase(str: string): string {
  return str.replace(/^[a-z]/, firstLetter => firstLetter.toUpperCase());
}

/**
 * 创建组件名称
 * @param cname
 * @returns
 * icon => CzIcon
 */
export function useCreateComponentName(cname: string): string {
  const ns = firstLetterToUpperCase(cst.COMPONENT_NAMESPACE_PREFIX);
  const componentName = firstLetterToUpperCase(cname);
  return `${ns}${componentName}`;
}

const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};

/**
 * BEM
 */

export const useNamespace = (block: string) => {
  const namespace = computed(() => cst.NAMESPACE_PREFIX);
  /**
   * ns.b('overlay')
   * @param blockSuffix
   * @returns cz-button-overlay
   */
  const b = (blockSuffix = '') => _bem(unref(namespace), block, blockSuffix, '', '');
  /**
   * ns.e('header')
   * @param element
   * @returns cz-button__header
   */
  const e = (element?: string) => (element ? _bem(unref(namespace), block, '', element, '') : '');
  /**
   * ns.m('theme-dark')
   * @param modifier
   * @returns cz-button--theme-dark
   */
  const m = (modifier?: string) =>
    modifier ? _bem(unref(namespace), block, '', '', modifier) : '';
  /**
   * ns.be('header','close')
   * @param blockSuffix
   * @param element
   * @returns cz-button-header__close
   */
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element ? _bem(unref(namespace), block, blockSuffix, element, '') : '';
  /**
   * ns.em('footer','small')
   * @param element
   * @param modifier
   * @returns cz-button__footer--small
   */
  const em = (element?: string, modifier?: string) =>
    element && modifier ? _bem(unref(namespace), block, '', element, modifier) : '';
  /**
   * ns.bm('footer','small')
   * @param blockSuffix
   * @param modifier
   * @returns cz-button-footer--small
   */
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier ? _bem(unref(namespace), block, blockSuffix, '', modifier) : '';
  /**
   * ns.bem('footer','btn','primary')
   * @param blockSuffix
   * @param element
   * @param modifier
   * @returns cz-button-footer__btn--primary
   */
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(unref(namespace), block, blockSuffix, element, modifier)
      : '';
  /**
   * ns.is('closeable')
   * @param name
   * @param args
   * @returns is-closeable
   */
  const is: {
    // eslint-disable-next-line no-unused-vars
    (name: string, state: boolean | undefined): string;
    // eslint-disable-next-line no-unused-vars
    (name: string): string;
  } = (name: string, ...args: [boolean | undefined] | []) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const state = args.length >= 1 ? args[0]! : true;
    return name && state ? `${cst.STATE_PREFIX}${name}` : '';
  };
  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is
  };
};
export type UseNamespaceReturn = ReturnType<typeof useNamespace>;
