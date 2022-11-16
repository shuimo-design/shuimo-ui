/**
 * @description 弹窗配套hook测试用例
 * @author 阿怪
 * @date 2022/5/2 07:43
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, test, expect } from 'vitest';
import useDialog from '../../lib/message/dialog/useDialog';

describe('弹窗配套hook', () => {
  test('初始化参数', () => {
    const { visible } = useDialog();
    expect(visible.value).toBe(false);
  });

  test('显示弹窗', () => {
    const { visible, showDialog } = useDialog();
    showDialog();
    expect(visible.value).toBe(true);
  });

  test('关闭弹窗', () => {
    const { visible, closeDialog, showDialog } = useDialog();
    showDialog();
    expect(visible.value).toBe(true);
    closeDialog();
    expect(visible.value).toBe(false);
  });

  test('切换弹窗状态', () => {
    const { visible, toggleDialog } = useDialog();
    toggleDialog();
    expect(visible.value).toBe(true);
    toggleDialog();
    expect(visible.value).toBe(false);
  });
});
