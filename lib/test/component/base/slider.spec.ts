/**
 * @description slider component test
 * @author 阿怪
 * @date 2024/2/23 10:43
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MSlider from '../../../components/base/slider/MSlider.tsx';
import { ref } from 'vue';

const width = 200;
const magicBtnW = 20; // @see useSlider:30
let originalAddEventListener: typeof window.document.addEventListener;
describe('slider', () => {
  const eventList: any[] = [];
  beforeAll(() => {
    originalAddEventListener = window.document.addEventListener;
    window.document.addEventListener = vi.fn((...arg) => {
      eventList.push(arg);
      // const func = arg[1] as unknown as Function[];
      // const wrapperFunc = (...args2: any[]) => {
      //   func[0](...args2);
      // };
      // console.log(arg[0], arg[2]);
      // window.addEventListener(arg[0], wrapperFunc, arg[2]);
      // originalAddEventListener(arg[0], wrapperFunc, arg[2]);
    });
  });
  afterAll(() => {
    window.document.addEventListener = originalAddEventListener;
  });
  beforeEach(() => {
    window.getComputedStyle = vi.fn().mockImplementation(() => ({ width: '200px' }));
  });


  test('render', () => {
    const wrapper = mount(MSlider);
    expect(wrapper.html()).toContain('<div class="m-slider');
  });

  test('set max and min', () => {
    const valRef = ref(50);
    const max = 100;
    const min = 0;
    const wrapper = mount(MSlider, {
      props: { max, min, modelValue: valRef.value },
    });
    const translateX = (width - magicBtnW) / (max - min) * valRef.value;
    expect(wrapper.html()).toContain(`translate(${translateX}px, 0)`);
  });

  test('move button', async () => {
    // todo only toggle end event, need help to fix it
    // according to this issue: https://github.com/taye/interact.js/issues/129
    const valRef = ref(50);
    const wrapper = mount(MSlider, {
      props: { modelValue: valRef.value },
      emits: ['update:modelValue'],
    });
    const button = wrapper.find('.m-slider-button');
    const ele = button.element as HTMLElement;
    const eventDom = ele.parentElement!;
    eventList.forEach(args => {
      eventDom.addEventListener(args[0], args[1], args[2]);
    });

    // console.log(button.element);
    ele.dispatchEvent(new PointerEvent('pointerdown', {
      clientX: 0,
      clientY: 0,
      bubbles: true,
    }));
    ele.dispatchEvent(new PointerEvent('pointermove', {
      clientX: 600,
      clientY: 600,
      bubbles: true,
    }));
    ele.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    // console.log(wrapper.html());
  });
});
