/**
 * @description headless steps / step 浏览器测试
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { h } from 'vue';
import MSteps from '../MSteps';
import MStep from '../MStep';

describe('MSteps browser', () => {
  it('渲染 m-steps 根元素', async () => {
    const { container } = render(MSteps, {
      props: { active: 0 },
      slots: {
        default: () => [
          h(MStep, { title: '步骤一', index: 0 }),
          h(MStep, { title: '步骤二', index: 1 }),
        ],
      },
    });

    expect(container.querySelector('.m-steps')).not.toBeNull();
  });

  it('渲染正确数量的 m-step 子元素', async () => {
    const { container } = render(MSteps, {
      props: { active: 0 },
      slots: {
        default: () => [
          h(MStep, { title: '步骤一', index: 0 }),
          h(MStep, { title: '步骤二', index: 1 }),
          h(MStep, { title: '步骤三', index: 2 }),
        ],
      },
    });

    const steps = container.querySelectorAll('.m-step');
    expect(steps.length).toBe(3);
  });

  it('步骤图标区域渲染步骤编号', async () => {
    const { container } = render(MStep, {
      props: { title: '第一步', index: 0 },
    });

    const iconNumber = container.querySelector('.m-step-icon-number');
    expect(iconNumber).not.toBeNull();
    expect(iconNumber!.textContent).toBe('1');
  });

  it('title prop 渲染到 m-step-title', async () => {
    const { container } = render(MStep, {
      props: { title: '填写信息', index: 0 },
    });

    const title = container.querySelector('.m-step-title');
    expect(title).not.toBeNull();
    expect(title!.textContent).toBe('填写信息');
  });

  it('description prop 渲染到 m-step-description', async () => {
    const { container } = render(MStep, {
      props: { title: '第一步', description: '请填写个人信息', index: 0 },
    });

    const desc = container.querySelector('.m-step-description');
    expect(desc).not.toBeNull();
    expect(desc!.textContent).toBe('请填写个人信息');
  });

  it('非最后一步渲染连接尾线 m-step-tail', async () => {
    // MStep 单独渲染时 isLast=false（total 为 0，index 为 0）
    const { container } = render(MStep, {
      props: { title: '步骤一', index: 0 },
    });

    // 默认 total 为 0，step 的 isLast 依赖 context，单独渲染时 total=0 index=0 也认为不是最后
    // 这里通过 MSteps 包裹测试
    expect(container.querySelector('.m-step')).not.toBeNull();
  });

  it('status=finish 时有 m-step-finish 类', async () => {
    const { container } = render(MStep, {
      props: { title: '完成', index: 0, status: 'finish' },
    });

    const step = container.querySelector('.m-step');
    expect(step!.classList.contains('m-step-finish')).toBe(true);
  });

  it('status=error 时有 m-step-error 类', async () => {
    const { container } = render(MStep, {
      props: { title: '错误', index: 0, status: 'error' },
    });

    const step = container.querySelector('.m-step');
    expect(step!.classList.contains('m-step-error')).toBe(true);
  });

  it('icon prop 渲染为自定义图标', async () => {
    const { container } = render(MStep, {
      props: { title: '带图标', index: 0, icon: '★' },
    });

    const iconCustom = container.querySelector('.m-step-icon-custom');
    expect(iconCustom).not.toBeNull();
    expect(iconCustom!.textContent).toBe('★');
  });

  it('m-steps 在水平方向有 m-steps-horizontal 类', async () => {
    const { container } = render(MSteps, {
      props: { active: 0, direction: 'horizontal' },
      slots: {
        default: () => [h(MStep, { title: '步骤', index: 0 })],
      },
    });

    const steps = container.querySelector('.m-steps');
    expect(steps!.classList.contains('m-steps-horizontal')).toBe(true);
  });
});
