/**
 * @description
 * @author 阿怪
 * @date 2025/02/17 10:05
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineHook } from '../../../runtime/defineHook.ts';

export const useLi = defineHook((props) => {
  const renderInit = () => {
    return {
      class: ['m-li', { 'm-li-active': props.active }],
    };
  };
  return {
    renderInit
  };
});
