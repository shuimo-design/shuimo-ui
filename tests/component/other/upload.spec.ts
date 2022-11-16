/**
 * @description 文件上传组件测试用例
 * @author 阿怪
 * @date 2022/5/2 09:55
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import MUpload from '../../../lib/other/upload/MUpload';

describe('文件上传组件', function () {
  test('无参数渲染', () => {
    const wrapper = mount(MUpload, {
      slots: {
        default: '<div></div>'
      }
    });
    expect(wrapper.html()).toContain('m-upload');
  });
});
