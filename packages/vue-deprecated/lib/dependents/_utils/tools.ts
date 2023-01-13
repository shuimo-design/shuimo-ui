/**
 * @description 一些小工具
 * @author 阿怪
 * @date 2021/8/4 4:03 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

import type { MaybeComputedRef } from './types';
import { unref } from 'vue';

/**
 * 一个暂时的简易克隆方法
 * todo 待优化 别用JSON
 * @param data
 */
export const deepClone = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};

/**
 * 支持稍多类型的判断非空的方法
 * @param value
 */
export const notEmpty = (value: any) => {
  // 先处理基本类型
  // null
  // undefined
  if (value === undefined || value === null) {
    return false;
  }
  const valueType = typeof value;
  // string
  if (valueType === 'string') {
    return value !== '';
  }
  // number bigint boolean
  if (valueType === 'number' || valueType === 'bigint' || valueType === 'boolean' || valueType === 'function') {
    return true;
  }
  // symbol
  if (valueType === 'symbol') {
    return value.toString() !== 'Symbol()';
  }

  if (valueType === 'object') {
    // Bigint/Symbol no new

    if (value instanceof String || value instanceof Array) {
      return value.length !== 0;
    }

    if (value instanceof Number || value instanceof Boolean) {
      return true;
    }

    if (value instanceof Map || value instanceof Set) {
      return value.size > 0;
    }

    if (value instanceof WeakMap || value instanceof WeakSet) {
      console.error('WeakMap和WeakSet无法以通用的方式判断是否为空。');
      return false;
    }

    if (value instanceof RegExp) {
      return value.toString() !== '/(?:)/';
    }

    if (value instanceof Date) {
      return value.toString() !== 'Invalid Date';
    }

    const typedArrayTypes = [Int8Array, Uint8Array, Uint8ClampedArray,
      Int16Array, Uint16Array,
      Int32Array, Uint32Array, Float32Array,
      Float64Array];
    for (const arrayType of typedArrayTypes) {
      if (value instanceof arrayType) {
        return value.length;
      }
    }

    return Object.keys(value).length > 0;
  }
};

/**
 * 判断为空的方法，即notEmpty的取反
 * @param value
 */
export const isEmpty = (value: any) => !notEmpty(value);

/**
 * 判断所有都不为空的方法
 * @param arg
 */
export const everyNotEmpty = (...arg: any[]) => {
  for (const a of arg) {
    if (isEmpty(a)) {
      return false;
    }
  }
  return true;
};

/**
 * 判断所有都不为空的方法
 * @param arg
 */
export const everyIsEmpty = (...arg: any[]) => {
  for (const a of arg) {
    if (notEmpty(a)) {
      return false;
    }
  }
  return true;
};

export const isValidDate = (date: Date) => date instanceof Date && !isNaN(date.getTime());

export const getStyle = (selectStyle: CSSStyleDeclaration, type: string) => {
  const num = Number(selectStyle.getPropertyValue(type).replace('px', ''));
  return isNaN(num) ? 0 : num;
};

export function resolveUnref<T>(r: MaybeComputedRef<T>): T {
  return typeof r === 'function' ? (r as any)() : unref(r);
}

/**
 * @desc 判断一个参数是不是方法
 * @param Function
 */
 export const isFunction = (fn:Function):boolean => {
  return typeof fn === 'function'
}
