/**
 * @Description WCheckbox
 * @Author youus
 * @Date 2022/4/7 00:01
 * @Version v1.0.0
 *
 * Hello, humor
 */

import { defineComponent, computed, toRefs } from 'vue';
import { props } from './api';
import useVModel from '../../dependents/_composables/useVModel';

export default defineComponent({
  name: 'WCheckbox',
  props,
  setup(props, {emit}) {
    const { checked, modelValue } = toRefs(props)
    const [innerChecked, setInnerChecker] = useVModel(checked, modelValue, props.defaultChecked, props.onChange, emit)
    
    const selfChecked = computed(() => innerChecked.value);
  
    const wCheckboxStyle = computed(() => [
      'w-checkbox',
      {
        'w-cursor-disabled': props.disabled,
      }
    ])
    const checkStyle = computed(() => [
      'w-checkbox__inner',
      {
        'w-checkbox-is-checked': innerChecked.value,
        'w-cursor-disabled': props.disabled,
        'w-cursor-pointer': !props.disabled
      },
    ]);
    
    const innerStyle = computed(() => [{
      'w-checkbox__inner_checked': innerChecked.value,
      'w-cursor-disabled': props.disabled,
      'w-cursor-pointer': !props.disabled,
    }])
    
    const changeHandle = (e: Event) => {
      if (props.disabled) {
        return;
      }
      setInnerChecker(!innerChecked.value, { e });
    };

    return () => (
      <label class={wCheckboxStyle.value}>
        <input
          type="checkbox"
          value={props.value}
          class="w-checkbox__former"
          onChange={changeHandle}
          disabled={props.disabled}
          checked={selfChecked.value}
        />
        <span class={checkStyle.value}>
          <img src="/lib/assets/checkbox/border.png" alt="" />
          <span class={innerStyle.value} />
        </span>
        <span class="w-checkbox__label">{props.label}</span>
      </label>
    );
  },
})
