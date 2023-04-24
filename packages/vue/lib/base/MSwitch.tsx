/**
 * @description 开关组件
 * @author 阿怪
 * @date 2022/8/16 23:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * modelValue不为布尔值的时候暂时不冒泡，里面的逻辑不太清晰，后续可以扩展一下
 */
import { defineComponent, computed, ref } from 'vue';
import { props } from '@shuimo-design/core/lib/base/switch/api';
import { getIsActive, switchIsBoolean } from '@shuimo-design/core/lib/base/switch/useSwitch';
import { SwitchProps } from '@shuimo-design/core/lib/base/switch';
import { isEmpty } from '@shuimo-design/tools/empty';

export default defineComponent({
  name: 'MSwitch',
  emits: ['update:modelValue', 'change'],
  props: {
    ...props,
    value: { required: false },
    modelValue: props.value
  },
  setup(props, { emit, slots }) {
    const activeValue = ref(props.activeValue);
    const inactiveValue = ref(props.inactiveValue);

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
      emit('change', !isActive.value ? props.activeValue ?? true : props.inactiveValue ?? false);
    };

    return () => {

      const getInfo = (key: keyof Pick<SwitchProps, 'activeInfo' | 'inactiveInfo'>) => {
        if (slots[key]) {
          return slots[key]!();
        }
        return <span class="m-switch-span">{props[key]}</span>;
      };


      return <div class={[
        'm-switch',
        isActive.value ? 'm-switch-active' : 'm-switch-inactive',
        props.loading ? 'm-switch-loading' : '',
        props.disabled ? 'm-switch-disabled' : ''
      ]}>
        {getInfo('activeInfo')}
        <div class="m-switch-main">
          <div class="m-switch-core" onClick={changeSwitch}>
            <div class="m-switch-core-border"></div>
          </div>
        </div>
        {getInfo('inactiveInfo')}
      </div>;
    };

  }
});
