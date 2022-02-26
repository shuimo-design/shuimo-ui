/**
 * @description: form表单测试用例
 * @author: 南歌子
 * @date 2021/02/22 14:34
 * @version V1.0.0
 *
 * Hello, humor
 */

import {mount} from '@vue/test-utils';
import WForm from '../../../lib/form/WForm.vue';
import WFormItem from '../../../lib/form/WFormItem.vue';
import WInput from '../../../lib/input/WInput';

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
