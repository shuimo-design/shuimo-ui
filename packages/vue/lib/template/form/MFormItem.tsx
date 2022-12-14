/**
 * @description 表单的item组件
 * @author youus
 * @date 2021/1/11 11:51 AM
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v1.1.0 升级为tsx版本
 */
import { defineComponent } from 'vue';
import { itemProps } from './api';

export default defineComponent({
  name: 'MFormItem',
  props: itemProps,
  setup(props, { slots }) {
    return () => {
      const labelSlot = slots.label ? slots.label() : props.label;
      const defaultSlot = slots.default ? slots.default() : '';
      return (
        <div class="m-form-item">
          <label for={props.prop} class="m-form-item__label">
            {labelSlot}
          </label>
          <div class="m-form-item__content">{defaultSlot}</div>
        </div>
      );
    };
  }
});
