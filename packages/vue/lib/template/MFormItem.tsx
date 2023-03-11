/**
 * @description vue version formItem
 * @author youus
 * @date 2021/1/11 11:51 AM
 * @version v2.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * v1.1.0 升级为tsx版本
 * v2.0.0 @author 阿怪 use core hook version
 */
import { defineComponent } from 'vue';
import { useFormItem, formItemProps } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';

export default defineComponent({
  name: 'MFormItem',
  props: formItemProps,
  setup: (props, { slots }) => {
    return () => {
      const { getTemplate } = useFormItem();
      return cr(getTemplate({ props }), { slots });
    };
  }
});
