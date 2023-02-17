/**
 * @description 边框组件
 * @author 阿怪
 * @date 2021/8/23 8:45 下午
 * @version v2.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v2.0.0 阿怪 upgrade to core version
 */

import { defineComponent } from 'vue';
import { useBorder } from '@shuimo-design/core';
import { cr } from '../../../tools/coreRender';



export default defineComponent({
  name: 'MBorder',
  setup(props, { slots }) {
    return () => {
      const { getTemplate } = useBorder();
      return cr(getTemplate(), { slots })
    };
  }
});
