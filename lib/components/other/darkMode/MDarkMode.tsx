/**
 * @description dark mode component
 * @author 阿怪
 * @date 2023/4/25 20:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo fix feDropShadow warning
 */
import { defineComponent, h, onMounted, watch } from 'vue';
import { props } from './api';
import { useDarkMode } from './useDarkMode';
import { DarkModeProps } from './index';
import './darkMode.css';


export default defineComponent((props: DarkModeProps, { emit }) => {

  const { onMountedHook, toggleDarkMode, isDarkRef } = useDarkMode(props);

  const clickHandler = () => {
    isDarkRef.value = toggleDarkMode({ modelValue: !isDarkRef.value });
    emitChange(isDarkRef.value);
  };

  const emitChange = (val: boolean) => {
    emit('update:modelValue', val);
    emit('change', val);
  };

  onMounted(() => {
    let autoInit = props.autoMode;
    if (props.initHandler && typeof props.initHandler === 'function') {
      autoInit = props.initHandler();
      if (props.modelValue !== isDarkRef.value) {
        isDarkRef.value = Boolean(props.modelValue);
      }
    }
    if (autoInit) {
      onMountedHook();
      emitChange(isDarkRef.value);
    }
  });

  watch(() => props.modelValue, val => {
    if (val !== isDarkRef.value) {
      toggleDarkMode({ modelValue: val });
    }
  });

  return () => {
    const svg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520" class="m-dark-mode-svg"
                     stroke-width="1">
      <title>Dark Mode</title>
      <filter id="outset-shadow" x="-50%" y="-50%" width="200%" height="200%">
        {h('feDropShadow', { dx: 0, dy: 0, stdDeviation: 20, floodColor: 'black' })}
      </filter>
      <filter id="outset-shadow-white" x="-50%" y="-50%" width="200%" height="200%">
        {h('feDropShadow', { dx: 0, dy: 0, stdDeviation: 20, floodColor: 'white' })}
      </filter>
      <path
        class="svg-black"
        transform="translate(0)"
        fill="#000000"/>
      <path
        class="svg-white"
        transform="translate(0) rotate(180, 250, 250)"
        fill="#FFFFFF"/>
      <path
        class="fins"
        transform="translate(0)"
        fill="#000000"/>
      <circle class="svg-black" cx="250" cy="375" r="40"/>
      <circle class="svg-white" cx="250" cy="125" r="40" fill="#fff"/>
    </svg>;


    return <div class="m-dark-mode"
                onClick={() => clickHandler()}>
      {svg}
    </div>;
  };

}, {
  name: 'MDarkMode',
  props,
  emits: ['update:modelValue', 'change'],
});
