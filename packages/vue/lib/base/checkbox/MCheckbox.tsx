/**
 * @description MCheckbox
 * @author youus
 * @date 2022/4/7 00:01
 * @version v1.0.1
 *
 * Hello, humor
 *
 * v1.0.1 修复checkbox的slot支持
 * v2.0.0 阿怪 upgrade to core version
 */
import { defineComponent, ref, watch } from 'vue';
import { props } from '@shuimo-design/core/lib/base/checkbox/api';
import { getNewModelValue, initChecked } from '@shuimo-design/core/lib/base/checkbox/useCheckbox';
import { notEmpty } from '@shuimo-design/tools/empty';

export default defineComponent({
  name: 'MCheckbox',
  props,
  emits: ['change', 'update:modelValue'],
  setup(props, { emit, slots }) {

    const checked = ref(initChecked(props));

    watch(() => [props.modelValue, props.checked, props.value], () => {
      checked.value = initChecked(props);
    });

    const onClick = (e: MouseEvent) => {
      e.stopPropagation();
      checked.value = !checked.value;
      const newVal = getNewModelValue(props, checked.value);
      emit('change', newVal);
      emit('update:modelValue', newVal);
    };

    return () => {
      const label = <label class="m-checkbox-slot">
        {notEmpty(props.label) ? <span>{props.label}</span> : slots.default?.()}
      </label>;

      return <div class="m-checkbox" onClick={onClick}>
        <input type="checkbox" checked={checked.value}/>
        <div class="m-checkbox-checkbox"/>
        {
          props.indeterminate ? <div class="m-checkbox-checkbox-indeterminate"/> :
            checked.value ? <div class="m-checkbox-checkbox-inner"/> : null
        }
        {label}
      </div>;
    };
  }
});
