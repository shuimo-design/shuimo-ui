/**
 * @description 按钮组件
 * @author 阿怪
 * @date 2021/8/10 4:59 下午
 * @version v4.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 新增slot文本形式
 * v1.0.2 优化结构
 * v1.0.3 添加link属性
 * v2.0.0 升级交互
 * v2.1.0 使用border方式实现边框模块
 * v3.0.0 props从core导出
 * v4.0.0 use core-ui hook and **background use svg mask!!** <- huge improvement
 */
import { defineComponent, h } from 'vue';
import { ButtonCore } from '@shuimo-design/ui-core';
import { ButtonProps } from '@shuimo-design/ui-core/components/base/button/props';
import './button.css';

const { props, useButton } = ButtonCore;
export default defineComponent((props: ButtonProps, ctx) => {
  return () => {
    const { domType, slot, domProps } = useButton(props, ctx);
    return h(domType, domProps, slot);
  };
}, {
  name: 'MButton',
  props,
});
