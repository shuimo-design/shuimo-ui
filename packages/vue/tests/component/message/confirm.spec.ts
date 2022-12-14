/**
 * @description 确认框测试用例
 * @author 阿怪
 * @date 2022/5/2 09:02
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test } from 'vitest';
import MConfirm from '../../../lib/message/confirm/MConfirm';
import { DOMWrapper } from '@vue/test-utils';

describe('确认框测试用例', async () => {
  test('正常渲染', () => {
    MConfirm('text');
    const body = document.body;
    const bodyWrapper = new DOMWrapper(body);
    expect(bodyWrapper.html()).toContain('确定');
  });
});
