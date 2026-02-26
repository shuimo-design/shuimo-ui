/**
 * @description headless badge 组件
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, computed } from 'vue';
import { BadgeCore } from '@shuimo-design/ui-core';
import { BadgeProps } from '@shuimo-design/ui-core/components/base/badge/props';
import './badge.css';

const { props } = BadgeCore;

export default defineComponent((props: BadgeProps, { slots }) => {
  // 计算徽标显示文本：数字超过 max 时显示 max+
  const displayValue = computed(() => {
    if (props.isDot) return null;
    if (props.value === undefined || props.value === null) return null;
    const max = props.max ?? 99;
    if (typeof props.value === 'number' && props.value > max) {
      return `${max}+`;
    }
    return String(props.value);
  });

  return () => {
    const hasBadge = props.isDot || displayValue.value !== null;

    return (
      <div class={['m-badge', `m-badge-${props.type ?? 'error'}`]}>
        {slots.default?.()}
        {hasBadge && !props.hidden && (
          props.isDot
            ? <span class="m-badge-dot" />
            : <sup class="m-badge-content">{displayValue.value}</sup>
        )}
      </div>
    );
  };
}, {
  name: 'MBadge',
  props,
});
