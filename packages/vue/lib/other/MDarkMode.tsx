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
import { h, defineComponent, ref, onMounted } from 'vue';
import { props } from '@shuimo-design/core/lib/other/darkMode/api';
import { useDarkMode } from '@shuimo-design/core/lib/other/darkMode/useDarkMode';

export default defineComponent({
  name: 'MDarkMode',
  props: {
    modelValue: props.value
  },
  emits: ['update:modelValue'],
  setup: (props, { emit }) => {

    const { onMountedHook, toggleDarkMode, getBrowserDarkMode } = useDarkMode();
    const value = ref(props.modelValue ?? getBrowserDarkMode());

    const clickHandler = () => {
      value.value = !value.value;
      emit('update:modelValue', value.value);
      toggleDarkMode({ value: value.value });
    };

    onMounted(() => {
      onMountedHook();
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
          class="svg-black dark-hidden"
          transform="translate(0)"
          fill="#000000"/>
        <circle class="svg-black" cx="250" cy="375" r="40"/>
        <circle class="svg-white" cx="250" cy="125" r="40" fill="#fff"/>
      </svg>;


      return <div class="m-dark-mode"
                  onClick={(e: MouseEvent) => clickHandler()}>
        {svg}
      </div>;
    };
  }
});
