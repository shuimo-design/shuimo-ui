/**
 * @description headless space 组件
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, computed } from 'vue';
import { SpaceCore } from '@shuimo-design/ui-core';
import { SpaceProps } from '@shuimo-design/ui-core/components/base/space/props';
import './space.css';

const { props } = SpaceCore;

// 预设间距映射
const SIZE_MAP: Record<string, string> = {
  small: '8px',
  medium: '16px',
  large: '24px',
};

export default defineComponent((props: SpaceProps, { slots }) => {
  // 计算实际 gap 值
  const gap = computed(() => {
    const size = props.size ?? 'medium';
    if (typeof size === 'number') return `${size}px`;
    return SIZE_MAP[size] ?? SIZE_MAP.medium;
  });

  const style = computed(() => ({
    flexDirection: props.direction === 'vertical' ? 'column' as const : 'row' as const,
    flexWrap: props.wrap ? 'wrap' as const : 'nowrap' as const,
    alignItems: props.align ?? 'center',
    gap: gap.value,
  }));

  return () => {
    // 过滤掉 Fragment 节点，取出实际子节点逐个包裹
    const children = slots.default?.() ?? [];

    return (
      <div class="m-space" style={style.value}>
        {children.map((child, index) => (
          <div class="m-space-item" key={index}>
            {child}
          </div>
        ))}
      </div>
    );
  };
}, {
  name: 'MSpace',
  props,
});
