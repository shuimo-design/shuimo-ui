/**
 * @description 消息提示测试用例
 * @author 阿怪
 * @date 2022/5/2 07:58
 * @version v2.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * v2.0.0 适配新版Message
 */
import { describe, expect, test, vi } from "vitest";
import { WMessage } from "../../../lib/message/message";
import { DOMWrapper } from "@vue/test-utils";

describe('消息提示', () => {

  // todo 修复污染问题
  HTMLDivElement.prototype.animate = vi.fn();

  test('普通渲染', async () => {
    vi.useFakeTimers();
    await WMessage('提示内容');
    const body = document.body;
    const bodyWrapper = new DOMWrapper(body);
    expect(bodyWrapper.find('.w-message-content').text()).toBe('提示内容');
    await vi.runAllTimers();
  });

  test('2秒后触发remove', async () => {
    vi.useFakeTimers();
    await WMessage.info({
      content: '提示内容',
      duration: 2000
    });
    const body = document.body;
    const bodyWrapper = new DOMWrapper(body);
    expect(bodyWrapper.find('.w-message-content').text()).toBe('提示内容');
    // 我们需要模拟手动调用animate
    expect(bodyWrapper.find('.w-message')).not.toBeNull();
    await vi.runAllTimers();
    expect(body.innerHTML).toBe('');
  });
});
