/**
 * @description 宣纸背景组件
 * @author 阿怪
 * @date 2022/7/14 23:22
 * @version v1.0.1
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 默认改为冷色调，添加色调选项
 */
import { defineComponent } from 'vue';
import Printer from '../../other/printer/Printer';
import { useRicePaper, ricePaperProps } from '@shuimo-design/core';
import { cr } from '../../../tools/coreRender';
import { MNodeTemplate } from '@shuimo-design/types';


export default defineComponent({
  name: 'MRicePaper',
  props: ricePaperProps,
  setup: (props, { slots }) => {
    if (!slots || !slots.default) {
      Printer('水墨宣纸组件').error('必须传入default slot');
      return () => null;
    }

    return () => {
      const { getTemplate } = useRicePaper();
      const template = getTemplate(props) as MNodeTemplate;
      return cr(template, { props, slots });
    };
  }
});
