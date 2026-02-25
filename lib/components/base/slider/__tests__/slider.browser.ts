/**
 * @description lib slider 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MSlider from '../MSlider';

describe('MSlider browser', () => {
  it('渲染滑块', async () => {
    const { container } = render(MSlider, {
      props: { modelValue: 0 },
    });

    const el = container.querySelector('.m-slider');
    expect(el).not.toBeNull();
  });
});
