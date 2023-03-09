/**
 * @description 进度条组件
 * @author 阿怪
 * @date 2022/1/21 6:13 下午
 * @version v1.0.3
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 修复width与预期不一致的问题，优化渲染逻辑
 * v1.0.2 修复绝对定位造成竹叶及数字渲染位置错误的问题
 * v1.0.3 百分比模块改为slot模式（为支持nuxt ssr ）
 */
import { defineComponent } from 'vue';
import { useProgress, progressProps } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';

export default defineComponent({
  name: 'MProgress',
  props: progressProps,
  setup: (props, { slots }) => {
    return () => {
      const { getTemplate } = useProgress();
      return cr(getTemplate({ props }), { slots });
    };
  }
});
