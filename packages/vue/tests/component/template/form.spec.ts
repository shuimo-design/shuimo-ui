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
import { describe, test, expect } from 'vitest';
import MForm from '../../../lib/template/form/MForm';
import MFormItem from '../../../lib/template/form/MFormItem';
import MInput from '../../../lib/base/input/MInput';

const mountForm = (config: any) => {
  return mount({
    components: {
      [MForm.name]: MForm,
      [MFormItem.name]: MFormItem,
      [MInput.name]: MInput
    },
    ...config
  });
};

describe('form组件', () => {
  test('block渲染', () => {
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

  test('inline渲染', () => {
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
});
