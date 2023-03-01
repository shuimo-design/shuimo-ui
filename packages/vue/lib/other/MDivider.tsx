/**
 * @description 分割线
 * @author 阿怪
 * @date 2021/2/23 3:57 下午
 * @version v1.1.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v1.1.0  优化分割线素材，并新增分割线类型，暂时去除strong类型
 */
import { h, defineComponent } from 'vue';
import { dividerProps, useDivider } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';

export default defineComponent({
  name: 'MDivider',
  props: dividerProps,
  setup: (props) => {
    return () => {
      const { getTemplate } = useDivider();
      return cr(getTemplate({ props }));
    };
  }
});
