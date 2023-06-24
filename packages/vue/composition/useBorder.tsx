/**
 * @description border wrapper hook
 * @author 阿怪
 * @date 2023/5/11 23:57
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { h, VNode } from 'vue';
import MBorder from '../lib/template/border/MBorder';


export default function useBorder() {
  const withBorder = (slots: VNode | VNode[], className?: string) => {
    return h(MBorder, { class: className }, () => slots);
  };

  return {
    withBorder
  };
}
