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
import { describe, test, expect } from "vitest";
import WForm from '../../../lib/template/form/WForm.tsx';
import WFormItem from '../../../lib/template/form/WFormItem.vue';
import WInput from '../../../lib/base/input/WInput';

const mountForm = config => {
  return mount({
    components: {
      [WForm.name]: WForm,
      [WFormItem.name]: WFormItem,
      [WInput.name]: WInput
    },
    ...config
  })
};

describe('form组件', () => {
  test('block渲染', () => {
    const wrapper = mountForm({
      template: `
        <w-form>
          <w-form-item label="input输入：" prop="hello">
            <w-input value="hello, form"/>
          </w-form-item>
        </w-form>
      `
    })
    expect(wrapper.html()).toContain('w-form');
  })

  test('inline渲染', () => {
    const wrapper = mountForm({
      template: `
        <w-form inline>
          <w-form-item label="input输入：" prop="hello">
            <w-input value="hello, form"/>
          </w-form-item>
        </w-form>
      `
    })
    expect(wrapper.html()).toContain('w-form');
  })
})
