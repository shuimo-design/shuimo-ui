/**
 * @description headless form-item 表单项组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构：
 *   div.m-form-item
 *     label.m-form-item-label[for=prop]
 *     div.m-form-item-content
 */
import { defineComponent } from 'vue';
import { FormCore } from '@shuimo-design/ui-core/components/template/form';
import { FormItemProps } from '@shuimo-design/ui-core/components/template/form/props';
import './formItem.css';

const { formItemProps } = FormCore;

export default defineComponent((_props: FormItemProps, { slots }) => {
  const p = _props as Required<FormItemProps>;

  return () => {
    // label slot 优先，其次使用 label prop 文本
    const labelContent = slots.label ? slots.label() : p.label;

    return (
      <div class="m-form-item">
        <label for={p.prop} class="m-form-item-label">{labelContent}</label>
        <div class="m-form-item-content">{slots.default?.()}</div>
      </div>
    );
  };
}, {
  name: 'MFormItem',
  props: formItemProps,
});
