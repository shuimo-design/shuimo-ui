/**
 * @description darkMode test
 * @author 阿怪
 * @date 2023/5/9 02:16
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, test,beforeAll,vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { MDarkMode } from '../../../index.ts';


beforeAll(()=>{
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
})
describe('darkMode', function () {

  test('render',()=>{
    const wrapper = mount(MDarkMode);
    expect(wrapper.html()).toContain('<div class="m-dark-mode');
  });

  describe('function', function () {

    test('default html attribute',async () => {
      mount(MDarkMode);
      expect(document.documentElement.hasAttribute('dark')).toBe(false);
    });

    test('html dark attribute after click be true, in other words, switch dark mode',async () => {
      const wrapper = mount(MDarkMode);
      await wrapper.find('.m-dark-mode').trigger('click');
      expect(document.documentElement.hasAttribute('dark')).toBe(true);
    })

  });



});
