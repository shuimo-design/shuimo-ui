/**
 * @description lib deleteIcon 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MDeleteIcon from '../MDeleteIcon';

describe('MDeleteIcon browser (lib)', () => {
  it('渲染删除图标，包含 m-delete-icon 类名', async () => {
    const { container } = render(MDeleteIcon, {});

    const el = container.querySelector('.m-delete-icon');
    expect(el).not.toBeNull();
  });
});
