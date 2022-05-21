/**
 * @description WCheckbox
 * @author youus
 * @date 2022/4/7 00:01
 * @version v1.0.1
 *
 * Hello, humor
 *
 * v1.0.1 修复checkbox的slot支持
 */

import { defineComponent, computed, toRefs, inject, watchEffect, onBeforeUnmount } from 'vue';
import { props } from './api';
import useVModel from '../../dependents/_composables/useVModel';
import { CheckboxGroupContextKey } from './checkboxGroupApi';
import border from '../../assets/checkbox/border.png';

export default defineComponent({
  name: 'WCheckbox',
  props,
  emits: ['change', 'update:modelValue'],
  setup(props, { emit, slots }) {
    const uniId = Symbol('wCheckboxUniId');
    const checkboxGroup = inject(CheckboxGroupContextKey, undefined);

    const { checked, modelValue } = toRefs(props);

    const [innerChecked, setInnerChecker] = useVModel<boolean>({
      value: checked,
      modelValue,
      defaultValue: props.defaultChecked,
      onChange: (newValue, args) => {
        emit('change', newValue, args);
      },
      emit
    })

    const selfChecked = computed(() => {
      return checkboxGroup
        ? checkboxGroup.groupValue.value.includes(props.value)
        : innerChecked.value;
    })

    watchEffect(() => {
      if (checkboxGroup && selfChecked.value) {
        checkboxGroup.registerValue(uniId, props.value as string);
      }
    });
    onBeforeUnmount(() => {
      checkboxGroup?.cancelValue(uniId);
    });

    const innerDisabled = computed(() => (props.disabled as boolean) || checkboxGroup?.disabled.value);

    const wCheckboxStyle = computed(() => [
      'w-checkbox',
      {
        'w-cursor-disabled': innerDisabled.value,
      }
    ]);
    const checkStyle = computed(() => [
      'w-checkbox__inner',
      {
        'w-checkbox-is-checked': selfChecked.value,
        'w-cursor-disabled': innerDisabled.value,
        'w-cursor-pointer': !innerDisabled.value,
      },
    ]);
    const innerStyle = computed(() => [{
      'w-checkbox__inner_checked': selfChecked.value,
      'w-cursor-disabled': innerDisabled.value,
      'w-cursor-pointer': !innerDisabled.value,
    }]);


    const changeHandle = (e: Event) => {
      if (props.disabled) {
        return;
      }
      checkboxGroup?.checkHandle(props.label as string, props.value as string);
      setInnerChecker(!innerChecked.value, { e });
    };

    return () => (
      <label class={wCheckboxStyle.value}>
        <input
          type="checkbox"
          value={props.value}
          class="w-checkbox__former"
          onChange={changeHandle}
          disabled={innerDisabled.value}
          checked={selfChecked.value}
        />
        <span class={checkStyle.value}>
          <img src={border} alt=""/>
          <span class={innerStyle.value}/>
        </span>
        <span class="w-checkbox__label">{slots.default?.() ?? props.label}</span>
      </label>
    );
  },
})
