/**
 * @description 消息提示测试用例
 * @author 阿怪
 * @date 2022/5/2 07:58
 * @version v2.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * v2.0.0 适配新版Message
 */
import { describe, expect, test, vi } from 'vitest';
import { DOMWrapper } from '@vue/test-utils';
import { MMessage as MessageCreator } from '../../../../lib';
import { MessageDirectionType } from '../../../components/message/message';

describe('消息提示', () => {
  // todo 修复污染问题
  HTMLDivElement.prototype.animate = vi.fn();

  let MMessage;


  test('普通渲染', async () => {
    vi.useFakeTimers();
    MMessage = MessageCreator.create!();
    await MMessage('提示内容');
    const body = document.body;
    const bodyWrapper = new DOMWrapper(body);
    expect(bodyWrapper.find('.m-message-content').text()).toBe('提示内容');
    await vi.runAllTimers();
    vi.useRealTimers();
  });

  test('2秒后触发remove', async () => {
    vi.useFakeTimers();
    MMessage = MessageCreator.create!();
    await MMessage.info({ content: '提示内容', duration: 2000 });
    const body = document.body;
    const bodyWrapper = new DOMWrapper(body);
    expect(bodyWrapper.find('.m-message-content').text()).toBe('提示内容');
    // 我们需要模拟手动调用animate
    expect(bodyWrapper.find('.m-message')).not.toBeNull();
    await vi.runAllTimers();
    expect(body.innerHTML).toBe('');
  }, 1000);

  test('测试所有类型', async () => {
    vi.useFakeTimers();
    MMessage = MessageCreator.create!();
    const directions: Array<MessageDirectionType> = [
      'top-right',
      'top-left',
      'bottom-right',
      'bottom-left',
      'top-center',
    ];

    for (const direction of directions) {
      await MMessage({ content: '', direction });
    }

    await vi.runAllTicks();
    const body = document.body;
    const bodyWrapper = new DOMWrapper(body);
    for (const direction of directions) {
      expect(bodyWrapper.findAll('.m-message-list-' + direction).length).toBe(1);
    }
    await vi.runAllTimers();
    for (const direction of directions) {
      expect(bodyWrapper.findAll('.m-message-list-' + direction).length).toBe(0);
    }
    expect(bodyWrapper.html()).toBe('<body></body>');
  });
});
