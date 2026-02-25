/**
 * @description lib inputNumber 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MInputNumber from '../MInputNumber';

describe('MInputNumber browser', () => {
  it('渲染数字输入', async () => {
    const { container } = render(MInputNumber, {
      props: { modelValue: 0 },
    });

    const wrapper = container.querySelector('.m-input');
    expect(wrapper).not.toBeNull();
    expect(wrapper!.querySelector('input')).not.toBeNull();
  });

  it('disabled 属性正确传递', async () => {
    const { container } = render(MInputNumber, {
      props: { modelValue: 0, disabled: true },
    });

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.disabled).toBe(true);
  });
});
