/**
 * @description 标签组件
 * @author 阿怪
 * @date 2022/8/11 01:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h } from 'vue';
import { tagProps, useTag } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';

export default defineComponent({
  name: 'MTag',
  props: tagProps,
  setup: (props, { slots }) => {
    return () => {
      const { getTemplate } = useTag();
      return cr(getTemplate({
        props
      }), { slots });
    };
  }
});
