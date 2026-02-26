/**
 * @description headless skeleton 组件
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { SkeletonCore } from '@shuimo-design/ui-core';
import { SkeletonProps } from '@shuimo-design/ui-core/components/base/skeleton/props';
import './skeleton.css';

const { props } = SkeletonCore;

export default defineComponent((props: SkeletonProps, { slots }) => {
  return () => {
    // loading=false 时渲染真实内容插槽
    if (!props.loading) {
      return <>{slots.default?.()}</>;
    }

    const rows = props.rows ?? 3;

    return (
      <div class={{
        'm-skeleton': true,
        'm-skeleton-animated': props.animated !== false,
      }}>
        {/* 头像占位圆 */}
        {props.avatar && <div class="m-skeleton-avatar" />}

        <div class="m-skeleton-body">
          {/* 标题占位条（比普通行更宽）*/}
          {props.title !== false && <div class="m-skeleton-title" />}

          {/* 文本行，最后一行宽度 60% */}
          {Array.from({ length: rows }).map((_, i) => (
            <div
              key={i}
              class="m-skeleton-row"
              style={i === rows - 1 ? { width: '60%' } : undefined}
            />
          ))}
        </div>
      </div>
    );
  };
}, {
  name: 'MSkeleton',
  props,
});
