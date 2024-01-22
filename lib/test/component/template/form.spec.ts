/**
 * @description: form表单测试用例
 * @author: 南歌子
 * @date 2021/02/22 14:34
 * @version v1.0.1
 *
 * Hello, humor
 *
 * v1.0.1 升级为vitest版本测试用例 阿怪
 */
import { mount } from '@vue/test-utils';
import { describe, test, expect, vi } from 'vitest';
import { MButton, MForm, MFormItem, MInput } from '../../../../../lib';

const mountForm = (config: any) => {
  return mount({
    components: {
      [MForm.name]: MForm,
      [MFormItem.name]: MFormItem,
      [MInput.name]: MInput,
      [MButton.name]: MButton
    },
    ...config
  });
};

describe('form', () => {
  test('block render', () => {
    const wrapper = mountForm({
      template: `
        <m-form>
          <m-form-item label="input输入：" prop="hello">
            <m-input value="hello, form"/>
          </m-form-item>
        </m-form>
      `
    });
    expect(wrapper.html()).toContain('m-form');
  });

  test('inline', () => {
    const wrapper = mountForm({
      template: `
        <m-form inline>
          <m-form-item label="input输入：" prop="hello">
            <m-input value="hello, form"/>
          </m-form-item>
        </m-form>
      `
    });
    expect(wrapper.html()).toContain('m-form');
  });

  test('simple form-item',()=>{
    const wrapper = mountForm({
      template: `
        <m-form inline><m-form-item label="input输入：" prop="hello"/></m-form>`
    });
    expect(wrapper.html()).toContain('input输入');
  })

  test('form-item label slot',() => {
    const wrapper = mountForm({
      template: `
        <m-form inline>
          <m-form-item prop="hello">
            <template #label>
              <span>hi</span>
            </template>
            <m-input value="hello, form"/>
          </m-form-item>
        </m-form>
      `
    });
    expect(wrapper.html()).toContain('hi');
  });


  describe('onsubmit', () => {

    test('submit true', () => {
      const wrapper = mountForm({
        template: `
        <m-form inline submit>
          <m-form-item label="input输入：" prop="hello">
            <m-button/>
          </m-form-item>
        </m-form>`
      });
      // jsdom not support form onsubmit
      wrapper.trigger('submit');
    });
  });
});
