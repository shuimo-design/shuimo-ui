/**
 * @description 按钮组件
 * @author 阿怪
 * @date 2021/8/10 4:59 下午
 * @version v3.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 新增slot文本形式
 * v1.0.2 优化结构
 * v1.0.3 添加link属性
 * v2.0.0 升级交互
 * v2.1.0 使用border方式实现边框模块
 * v3.0.0 props从core导出
 */
import { defineComponent } from 'vue';
import { buttonProps, useButton } from '@shuimo-design/core';
import { cr } from '../../../tools/coreRender';


export default defineComponent({
  name: 'MButton',
  props: buttonProps,
  setup(props, { slots }) {
    return () => {
      const { getTemplate } = useButton();
      return cr(getTemplate({props}), { props, slots });
    };
  }
});
