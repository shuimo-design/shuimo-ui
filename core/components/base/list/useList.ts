/**
 * @description list hook
 * @author 阿怪
 * @date 2025/02/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

/**
 * @description 基础渲染，将数据转为字符串
 */
const baseRender = (item: unknown) => {
  if (['string', 'number'].includes(typeof item)) {
    return String(item);
  }
  if (typeof item === 'object') {
    return JSON.stringify(item);
  }
  return '';
};

export default function useList<T>() {
  const dataValidate = (data: T[] | undefined) => {
    if (!Array.isArray(data)) {
      console.warn('[shuimo-list] data必须是数组');
      return false;
    }
    return true;
  };

  return {
    baseRender,
    dataValidate,
  };
}
