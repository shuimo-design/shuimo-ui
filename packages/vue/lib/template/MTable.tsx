/**
 * @description vue version table
 * @author 阿怪
 * @date 2023/03/11 13:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { useTable, tableProps } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';

export default defineComponent({
  name: 'MTable',
  props: tableProps,
  setup: (props, { slots }) => {
    return () => {
      const { getTemplate } = useTable();
      return cr(getTemplate({ props, slots }), { slots });
    };
  }
});
