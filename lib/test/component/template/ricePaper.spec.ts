/**
 * @description 宣纸组件测试用例
 * @author 阿怪
 * @date 2022/7/15 00:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { beforeAll, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MRicePaper from '../../../components/template/ricePaper/MRicePaper.tsx';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});
describe('rice paper', () => {
  test('render', () => {
    const wrapper = mount(MRicePaper, {
      slots: {
        default: '<div>test</div>',
      },
    });

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class="m-rice-paper m-rice-paper-default">
        <div class="mountains">
          <div class="m-m-left">
            <div class="m-l-base m-m-reflect"></div>
            <div class="m-l-mid m-m-reflect"></div>
            <div class="m-l-front m-m-reflect"></div>
            <div class="m-l-front-2 m-m-reflect"></div>
          </div>
          <div class="m-m-right">
            <div class="m-r-base m-m-reflect"></div>
            <div class="m-r-mid m-m-reflect"></div>
            <div class="m-r-front m-m-reflect"></div>
            <div class="m-r-front-2 m-m-reflect"></div>
          </div>
        </div>
        <div class="m-rice-paper-hover"></div>
        <div class="m-rice-paper-layout">
          <div>test</div>
        </div>
      </div>"
    `);
  });

  describe('props', () => {
    test('hide mountain', () => {
      const wrapper = mount(MRicePaper, { props: { mountain: false } });
      expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class="m-rice-paper m-rice-paper-default">
        <!---->
        <div class="m-rice-paper-hover"></div>
        <div class="m-rice-paper-layout">
          <!---->
        </div>
      </div>"
    `);
    });

    test('layout full-screen', () => {
      const wrapper = mount(MRicePaper, { props: { layout: 'full-screen' } });
      expect(wrapper.html()).include('m-rice-paper-full-screen');
    });
  });

  describe('auto dark mode', () => {
    test('auto darkMode', () => {
      mount(MRicePaper);
      expect(document.documentElement.hasAttribute('dark')).toBe(true);
    });

    test('auto darkMode off', () => {
      mount(MRicePaper, { props: { autoDarkMode: false } });
      expect(document.documentElement.getAttribute('dark')).toBe('');
    });
  });


});
