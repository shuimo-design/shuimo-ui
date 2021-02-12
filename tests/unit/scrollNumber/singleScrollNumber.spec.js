import { shallowMount } from '@vue/test-utils'
import SingleScrollNumber from '../../../lib/scrollNumber/SingleScrollNumber';

jest.useFakeTimers();

describe('单页面滚动数字', () => {

  test('无参数渲染', () => {
    const wrapper = shallowMount(SingleScrollNumber);
    expect(wrapper.html()).toContain('span class="box-item"');
  });

  test('inject参数渲染', () => {
    const wrapper = shallowMount(
      SingleScrollNumber,
      {
        global: {
          provide: {
            speed: 1,
            duration: 2
          }
        }
      });
    expect(wrapper.vm.speed).toBe(1);
    expect(wrapper.vm.duration).toBe(2);
  });

  test('调用定时器', () => {
    const wrapper = shallowMount(
      SingleScrollNumber,
      { global: { provide: { speed: 1, duration: 2 } } }
    );
    jest.runOnlyPendingTimers();
    expect(wrapper.vm.style).toMatchObject({ transform: 'translate(-50%,-0%)' });
  });

  test('设定数值7', () => {
    const wrapper = shallowMount(
      SingleScrollNumber,
      {
        props: { number: 7 },
        global: { provide: { speed: 1, duration: 2 } }
      }
    );
    jest.runOnlyPendingTimers();
    expect(wrapper.vm.style).toMatchObject({ transform: 'translate(-50%,-70%)' });
  });
})


