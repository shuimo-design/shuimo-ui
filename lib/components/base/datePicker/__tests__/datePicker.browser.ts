/**
 * @description lib datePicker 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MDatePicker from '../MDatePicker';

describe('MDatePicker browser', () => {
  it('渲染日期选择器', async () => {
    const { container } = render(MDatePicker, {
      props: { modelValue: '' },
    });

    expect(container.querySelector('.m-date-picker')).not.toBeNull();
  });

  it('渲染带初始值的日期选择器', async () => {
    const { container } = render(MDatePicker, {
      props: { modelValue: '2026-02-25' },
    });

    expect(container.querySelector('.m-date-picker')).not.toBeNull();
    // 日期选择器的触发区域应显示日期值
    const active = container.querySelector('.m-date-picker-active');
    expect(active).not.toBeNull();
  });
});
