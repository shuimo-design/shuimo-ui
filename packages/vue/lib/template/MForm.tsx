/**
 * @description vue version form
 * @author 阿怪
 * @date 2022/2/13 12:28 AM
 * @version v2.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * V1.1.0 @author 阿怪 重构为tsx版本，并添加submit事件劫持
 * v2.0.0 @author 阿怪 use core hook version
 */
import { defineComponent } from 'vue';
import { useForm, formProps } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';

export default defineComponent({
  name: 'MForm',
  props: formProps,
  setup: (props, { slots }) => {
    return () => {
      const { getTemplate } = useForm();
      return cr(getTemplate({ props }), { slots });
    };
  }
});
