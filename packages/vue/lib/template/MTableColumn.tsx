/**
 * @description vue version tableColumn
 * @author 阿怪
 * @date 2023/03/11 13:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { useTableColumn, tableColumnProps } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';

export default defineComponent({
  name: 'MTableColumn',
  props: tableColumnProps,
  setup: (props, { slots }) => {
    return () => {
      const { getTemplate } = useTableColumn();
      return cr(getTemplate({ props }), { slots });
    };
  }
});
