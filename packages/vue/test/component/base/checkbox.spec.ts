/**
 * @description checkbox测试用例
 * @author 阿怪
 * @date 2022/5/1 19:46
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * -- revert from version 1a4404c3 -- ignore checkbox-group right now
 */

import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import MCheckbox from '../../../lib/base/checkbox/MCheckbox';
// import MCheckboxGroup from '../../../lib/base/checkbox/MCheckboxGroup';
import { h } from 'vue';

describe('checkbox', () => {
  test('render', () => {
    const wrapper = mount(MCheckbox);
    expect(wrapper.find('input').html()).toContain('type="checkbox"');
  });

  describe('props', () => {

    test('label', () => {
      const wrapper = mount(MCheckbox, {
        props: { label: '测试label' }
      });
      expect(wrapper.find('.m-checkbox-slot').text()).toBe('测试label');
    });

    test('checked',()=>{
      const wrapper = mount(MCheckbox, {
        props: { checked:true }
      });
      expect(wrapper.find('.m-checkbox').html()).toContain('m-checkbox-checkbox-inner');
    })


    describe('modify props', function () {

      test('modify modelValue', async () => {
        const wrapper = mount(MCheckbox, {
          props: {
            modelValue: false
          }
        });
        expect(wrapper.html()).not.toContain('m-checkbox-checkbox-inner');
        await wrapper.setProps({modelValue:true});
        expect(wrapper.html()).toContain('m-checkbox-checkbox-inner');
      })
    });

  })

  test('slot', () => {
    const wrapper = mount(MCheckbox, {
      slots: {
        default: () => h('div', '测试slot')
      }
    });
    expect(wrapper.find('.m-checkbox-slot').text()).toBe('测试slot');
  });

  test('click', async () => {
    const wrapper = mount(MCheckbox, {
      props: {
        label: '测试label',
        modelValue: false
      }
    });
    expect(wrapper.html()).not.toContain('m-checkbox-checkbox-inner');
    await wrapper.find('.m-checkbox').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toMatchObject([[true]]);
  });
});

// describe('伴随group', () => {
//   const slotA = h(MCheckbox, { label: 'A', value: 'a' });
//   const slotB = h(MCheckbox, { label: 'B', value: 'b' });
//   const slotC = h(MCheckbox, { label: 'C', value: 'c' });
//   const wrapper = mount(MCheckboxGroup, {
//     props: { modelValue: ['a', 'c'] },
//     slots: {
//       default: [slotA, slotB, slotC]
//     }
//   });
//
//   test('插槽渲染正确', () => {
//     expect(wrapper.find('.m-checkbox-group').findAllComponents(MCheckbox).length).toBe(3);
//   });
//
//   test('选中两个参数a,c渲染', () => {
//     const slots = wrapper.find('.m-checkbox-group').findAllComponents(MCheckbox);
//     expect(slots[0].html()).toContain('m-checkbox__inner_checked');
//     expect(slots[1].html()).not.toContain('m-checkbox__inner_checked');
//     expect(slots[2].html()).toContain('m-checkbox__inner_checked');
//   });
// });
