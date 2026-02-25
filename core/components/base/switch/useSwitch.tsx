/**
 * @description switch hook
 * @author 阿怪
 * @date 2023/4/23 21:34
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { SwitchProps } from './props';
import { EmitsOptions, SlotsType } from '@vue/runtime-core';
import { computed, ref } from 'vue';
import { isEmpty } from '../../../tools';

export const switchIsBoolean = (value: SwitchProps['modelValue']) => {
  return typeof value === 'boolean';
};

export const getIsActive = (value: SwitchProps['modelValue'], activeValue: SwitchProps['activeValue']) => {
  return value === activeValue;
};


export default function useSwitch<
  Props extends Record<string, any>,
  E extends EmitsOptions = {},
  EE extends string = string,
  S extends SlotsType = {}
  // >(props: Props, ctx: SetupContext<E, S>) {
>(props: Props, ctx: any) {
  const activeValue = ref(props.activeValue);
  const inactiveValue = ref(props.inactiveValue);
  const { slots, emit } = ctx;

  const isBoolean = computed(() => switchIsBoolean(props.modelValue));
  // 如果modelValue是布尔值
  if (isBoolean.value) {
    // 如果activeValue和inactiveValue都为空
    if (isEmpty(props.activeValue) && isEmpty(props.inactiveValue)) {
      activeValue.value = true;
      inactiveValue.value = false;
    }
  }

  const isActive = computed(() => getIsActive(props.modelValue, activeValue.value));


  const changeSwitch = () => {
    if (props.disabled || props.loading) {
      return;
    }
    // 如果不是自定义控制的
    if (!props.onControl) {
      // 如果是简单的布尔值
      if (isBoolean.value) {
        emit('update:modelValue', !props.modelValue);
      }
    }
    emit('change', !isActive.value ? props.activeValue ?? true : inactiveValue ?? false);
  };

  const getInfo = (key: keyof Pick<SwitchProps, 'activeInfo' | 'inactiveInfo'>) => {
    if (slots[key]) {
      return slots[key]!();
    }
    const info = props[key];
    if (!info) {
      return;
    }
    return <span class="m-switch-span">{info}</span>;
  };
  const switchClass = computed(()=>[
    'm-switch',
    isActive.value ? 'm-switch-active' : 'm-switch-inactive',
    { 'm-switch-loading': props.loading },
    { 'm-switch-disabled': props.disabled },
  ])


  return {
    getInfo,
    changeSwitch,
    switchClass
  };
}
