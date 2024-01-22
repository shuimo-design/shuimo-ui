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
import { defineComponent, h, onMounted, ref, watch } from 'vue';
import { props } from './api';
import { useDarkMode } from './useDarkMode';


export default defineComponent((props, { emit }) => {

  const { onMountedHook, toggleDarkMode, getBrowserDarkMode } = useDarkMode(props.autoMode);
  const value = ref(props.modelValue ?? getBrowserDarkMode());

  const clickHandler = (e: MouseEvent) => {
    value.value = !value.value;
    emit('update:modelValue', value.value);
    emit('change', value.value);
    toggleDarkMode({ modelValue: value.value });
  };

  onMounted(() => {
    let autoInit = props.autoMode;
    if (props.initHandler && typeof props.initHandler === 'function') {
      autoInit = props.initHandler();
    }

    if (autoInit) {
      onMountedHook();
    }
  });

  watch(() => props.modelValue, (val) => {
    toggleDarkMode({ modelValue: val });
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
                onClick={(e: MouseEvent) => clickHandler(e)}>
      {svg}
    </div>;
  };

}, {
  name: 'MDarkMode',
  props,
  emits: ['update:modelValue', 'change']
});
