/**
 * @description switch开关测试用例
 * @author 阿怪
 * @date 2022/8/17 01:11
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MSwitch from '../../../lib/base/switch/MSwitch';

describe('开关组件', () => {
  describe('参数测试', () => {
    test('仅modelValue参数渲染', () => {
      const wrapper = mount(MSwitch, { props: { modelValue: true } });
      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class=\\"m-switch m-switch-active\\"><span class=\\"m-switch-span\\"></span>
          <div class=\\"m-switch-main\\">
            <div class=\\"m-switch-core\\">
              <div class=\\"m-switch-core-border\\"></div>
            </div>
          </div><span class=\\"m-switch-span\\"></span>
        </div>"
      `);
    });

    test('active和inactive都参数', () => {
      const wrapper = mount(MSwitch, {
        props: {
          modelValue: true,
          activeInfo: 'active',
          inactiveInfo: 'inactive'
        }
      });
      expect(wrapper.findAll('.m-switch-span').map(e => e.html())).toMatchInlineSnapshot(`
        [
          "<span class=\\"m-switch-span\\">active</span>",
          "<span class=\\"m-switch-span\\">inactive</span>",
        ]
      `);
    });

    test('active参数被slot覆盖', () => {
      const wrapper = mount(MSwitch, {
        slots: {
          activeInfo: 'active slot info'
        },
        props: {
          modelValue: true,
          activeInfo: 'activeInfo',
          inactiveInfo: 'inactiveInfo'
        }
      });
      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class=\\"m-switch m-switch-active\\">active slot info<div class=\\"m-switch-main\\">
            <div class=\\"m-switch-core\\">
              <div class=\\"m-switch-core-border\\"></div>
            </div>
          </div><span class=\\"m-switch-span\\">inactiveInfo</span></div>"
      `);
    });

    test('activeValue和inactiveValue参数', async () => {
      const wrapper = mount(MSwitch, {
        props: { modelValue: 'hi', activeValue: 'hi', inactiveValue: 'bye' }
      });
      await wrapper.find('.m-switch-core').trigger('click');
      expect(wrapper.find('.m-switch').html()).toMatchInlineSnapshot(`
        "<div class=\\"m-switch m-switch-active\\"><span class=\\"m-switch-span\\"></span>
          <div class=\\"m-switch-main\\">
            <div class=\\"m-switch-core\\">
              <div class=\\"m-switch-core-border\\"></div>
            </div>
          </div><span class=\\"m-switch-span\\"></span>
        </div>"
      `);
    });

    test('loading参数', async () => {
      const wrapper = mount(MSwitch, { props: { modelValue: true, loading: true } });
      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class=\\"m-switch m-switch-active m-switch-loading\\"><span class=\\"m-switch-span\\"></span>
          <div class=\\"m-switch-main\\">
            <div class=\\"m-switch-core\\">
              <div class=\\"m-switch-core-border\\"></div>
            </div>
          </div><span class=\\"m-switch-span\\"></span>
        </div>"
      `);
    });

    test('disabled参数', async () => {
      const wrapper = mount(MSwitch, { props: { modelValue: true, disabled: true } });
      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<div class=\\"m-switch m-switch-active m-switch-disabled\\"><span class=\\"m-switch-span\\"></span>
          <div class=\\"m-switch-main\\">
            <div class=\\"m-switch-core\\">
              <div class=\\"m-switch-core-border\\"></div>
            </div>
          </div><span class=\\"m-switch-span\\"></span>
        </div>"
      `);
    });
  });

  test('修改active', async () => {
    const wrapper = mount(MSwitch, { props: { modelValue: true } });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class=\\"m-switch m-switch-active\\"><span class=\\"m-switch-span\\"></span>
        <div class=\\"m-switch-main\\">
          <div class=\\"m-switch-core\\">
            <div class=\\"m-switch-core-border\\"></div>
          </div>
        </div><span class=\\"m-switch-span\\"></span>
      </div>"
    `);
    await wrapper.setProps({ modelValue: false });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class=\\"m-switch m-switch-inactive\\"><span class=\\"m-switch-span\\"></span>
        <div class=\\"m-switch-main\\">
          <div class=\\"m-switch-core\\">
            <div class=\\"m-switch-core-border\\"></div>
          </div>
        </div><span class=\\"m-switch-span\\"></span>
      </div>"
    `);
  });

  describe('change冒泡', () => {
    test('change默认冒泡', async () => {
      const wrapper = mount(MSwitch, { props: { modelValue: true } });
      await wrapper.find('.m-switch-core').trigger('click');
      expect(wrapper.emitted()['change'][0]).toMatchInlineSnapshot(`
        [
          false,
        ]
      `);
    });

    test('change仅有activeValue时冒泡', async () => {
      const wrapper = mount(MSwitch, { props: { modelValue: 'hi', activeValue: 'hi' } });
      await wrapper.find('.m-switch-core').trigger('click');
      expect(wrapper.emitted()['change'][0]).toMatchInlineSnapshot(`
        [
          false,
        ]
      `);
    });

    test('change仅有inactiveValue时冒泡', async () => {
      const wrapper = mount(MSwitch, { props: { modelValue: 'bye', inactiveValue: 'hi' } });
      await wrapper.find('.m-switch-core').trigger('click');
      expect(wrapper.emitted()['change'][0]).toMatchInlineSnapshot(`
        [
          true,
        ]
      `);
    });

    test('loading时不冒泡', async () => {
      const wrapper = mount(MSwitch, { props: { modelValue: true, loading: true } });
      await wrapper.find('.m-switch-core').trigger('click');
      expect(wrapper.emitted()['update:modelValue']).toBeUndefined();
      expect(wrapper.emitted()['change']).toBeUndefined();
    });

    test('disabled时不冒泡', async () => {
      const wrapper = mount(MSwitch, { props: { modelValue: true, disabled: true } });
      await wrapper.find('.m-switch-core').trigger('click');
      expect(wrapper.emitted()['update:modelValue']).toBeUndefined();
      expect(wrapper.emitted()['change']).toBeUndefined();
    });

    test('change有参数冒泡', async () => {
      const wrapper = mount(MSwitch, {
        props: { modelValue: 'hi', activeValue: 'hi', inactiveValue: 'bye' }
      });
      await wrapper.find('.m-switch-core').trigger('click');
      expect(wrapper.emitted()['change'][0]).toMatchInlineSnapshot(`
        [
          "bye",
        ]
      `);
    });
  });

  describe('onControl', () => {
    test('onControl为true时改变modelValue', async () => {
      const wrapper = mount(MSwitch, {
        props: { modelValue: true, onControl: false }
      });
      await wrapper.find('.m-switch-core').trigger('click');
      expect(wrapper.emitted()['update:modelValue'][0]).toMatchInlineSnapshot(`
        [
          false,
        ]
      `);
    });
    test('onControl为true时不改变modelValue', async () => {
      vi.useFakeTimers();
      const wrapper = mount(MSwitch, {
        props: { modelValue: true, onControl: true }
      });
      await wrapper.find('.m-switch-core').trigger('click');
      expect(wrapper.emitted()['update:modelValue']).toBeUndefined();
    });
  });
});
