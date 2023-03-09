/**
 * @description some tools
 * @author 阿怪
 * @date 2023/3/8 20:39
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export const unref = (value: any) => (value && (value.value || value.current)) || value;

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
