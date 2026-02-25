/**
 * @description headless form 表单组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构：
 *   form.m-form
 *   form.m-form.m-form-inline  （inline 模式）
 */
import { defineComponent, h } from 'vue';
import { FormCore } from '@shuimo-design/ui-core/components/template/form';
import { FormProps } from '@shuimo-design/ui-core/components/template/form/props';
import './form.css';

const { props } = FormCore;

export default defineComponent((_props: FormProps, { slots }) => {
  const p = _props as Required<FormProps>;

  return () => h(
    'form',
    {
      class: {
        'm-form': true,
        'm-form-inline': p.inline,
      },
      // submit 为 false 时阻止表单默认提交行为
      onSubmit: (e: Event) => {
        if (!p.submit) e.preventDefault();
      },
    },
    slots,
  );
}, {
  name: 'MForm',
  props,
});
