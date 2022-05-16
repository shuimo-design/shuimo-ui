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
  HTMLDivElement.prototype.animate = (keyframes: any, options: any) => {
    return {
      onfinish: () => {
        console.log('finish');
      }
    } as any;
  };

  test('普通渲染', async () => {
    vi.useFakeTimers();
    await WMessage('提示内容');
    const body = document.body;
    const bodyWrapper = new DOMWrapper(body);
    expect(bodyWrapper.find('.w-message-content').text()).toBe('提示内容');
    vi.runAllTimers();
  });

  // todo fix this test
  test.skip('2秒后触发remove', async () => {
    vi.useFakeTimers();
    await WMessage.info({
      content: '提示内容',
      duration: 2000
    });
    const body = document.body;
    const bodyWrapper = new DOMWrapper(body);
    expect(bodyWrapper.find('.w-message-content').text()).toBe('提示内容');
    const spy = vi.spyOn(bodyWrapper.find('#w-messages').element, 'remove').mockImplementation(() => {});
    vi.runAllTimers();
    expect(spy).toHaveBeenCalled()
  });
});
