/**
 * @description lib avatar 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MAvatar from '../MAvatar';

describe('MAvatar browser (lib)', () => {
  it('渲染头像，包含 m-avatar 类名', async () => {
    const { container } = render(MAvatar, {});

    // lib MAvatar 根元素始终挂载 m-avatar 类名
    const el = container.querySelector('.m-avatar');
    expect(el).not.toBeNull();
  });
});
