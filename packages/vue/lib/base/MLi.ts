/**
 * @description Li
 * @author 阿怪
 * @date 2023/2/14 01:23
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { liProps, useLi } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';

export default defineComponent({
  name: 'MLi',
  props: liProps,
  setup(props, { slots }) {
    return () => {
      const { getTemplate } = useLi();
      return cr(getTemplate({
        props
      }), { props, slots });
    };
  }
});
