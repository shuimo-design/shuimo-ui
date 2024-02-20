/**
 * @description vue version formItem
 * @author 阿怪
 * @date 2023/05/04 20:36
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { formItemProps } from './api.ts';

export default defineComponent((props, { slots }) => {
  return () => {
    const labelSlot = slots.label ? slots.label() : props.label;
    const defaultSlot = slots.default ? slots.default() : '';
    return <div class="m-form-item">
      <label for={props.prop} class="m-form-item-label">
        {labelSlot}
      </label>
      <div class="m-form-item-content">{defaultSlot}</div>
    </div>;
  };
}, {
  name: 'MFormItem',
  props: formItemProps,
});
