/**
 * @description headless empty 组件
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { EmptyCore } from '@shuimo-design/ui-core';
import { EmptyProps } from '@shuimo-design/ui-core/components/base/empty/props';
import './empty.css';

const { props } = EmptyCore;

export default defineComponent((props: EmptyProps, { slots }) => {
  return () => (
    <div class="m-empty">
      {/* 图片区域：优先使用插槽，其次使用 image prop，最后使用默认占位 */}
      <div class="m-empty-image">
        {slots.image
          ? slots.image()
          : props.image
            ? <img src={props.image} alt="empty" />
            : slots.default?.()
        }
      </div>

      {/* 描述文字 */}
      <div class="m-empty-description">
        {props.description}
      </div>

      {/* 底部操作区（如重新加载按钮等） */}
      {slots.footer && (
        <div class="m-empty-footer">
          {slots.footer()}
        </div>
      )}
    </div>
  );
}, {
  name: 'MEmpty',
  props,
});
