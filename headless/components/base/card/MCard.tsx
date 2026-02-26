/**
 * @description headless card 组件
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { CardCore } from '@shuimo-design/ui-core';
import { CardProps } from '@shuimo-design/ui-core/components/base/card/props';
import './card.css';

const { props } = CardCore;

export default defineComponent((props: CardProps, { slots }) => {
  return () => {
    // 有标题 prop 或有 header 插槽时才渲染头部
    const hasHeader = props.title || slots.header;

    return (
      <div class={['m-card', props.shadow && `m-card-shadow-${props.shadow}`]}>
        {hasHeader && (
          <div class="m-card-header">
            {slots.header ? slots.header() : props.title}
          </div>
        )}
        <div class="m-card-body" style={props.bodyStyle}>
          {slots.default?.()}
        </div>
      </div>
    );
  };
}, {
  name: 'MCard',
  props,
});
