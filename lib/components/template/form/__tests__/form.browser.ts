/**
 * @description lib form 浏览器测试
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import MForm from '../MForm';

describe('MForm browser', () => {
  it('渲染表单', async () => {
    const { container } = render(MForm, {
      slots: {
        default: () => '表单内容',
      },
    });

    expect(container.querySelector('.m-form')).not.toBeNull();
  });

  it('渲染内联表单', async () => {
    const { container } = render(MForm, {
      props: { inline: true },
      slots: {
        default: () => '内联表单',
      },
    });

    const form = container.querySelector('.m-form');
    expect(form).not.toBeNull();
    expect(form!.classList.contains('m-form-inline')).toBe(true);
  });

  it('渲染 slot 内容', async () => {
    const { container } = render(MForm, {
      slots: {
        default: () => '表单字段',
      },
    });

    const form = container.querySelector('.m-form');
    expect(form!.textContent).toContain('表单字段');
  });
});
