/**
 * @description core list hook
 * @author 阿怪
 * @date 2023/05/04 22:46
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo nesting list
 */
import MPrinter from '../../other/printer/Printer';

const error = MPrinter('水墨list组件').error;


const baseRender = (item: any) => {
  if (['string', 'number'].includes(typeof item)) {
    return String(item);
  }
  if (typeof item === 'object') {
    return JSON.stringify(item);
  }
  return '';
};

export function useList<T>() {

  const dataValidate = (data: T[] | undefined) => {
    if (!Array.isArray(data)) {
      error('data必须是数组');
      return false;
    }
    return true;
  };


  return {
    baseRender,
    dataValidate
  };
}
