/**
 * @description 打印模块测试用例
 * @author 阿怪
 * @date 2022/5/2 09:58
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test, vi } from 'vitest';
import Printer from '../../../lib/other/printer/Printer';

describe('打印模块', function () {
  const p = Printer('测试用例');

  test('信息模式', () => {
    const infoSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    p.info('信息模式');
    expect(infoSpy).toHaveBeenCalled();
  });

  test('建议模式', () => {
    const infoSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    p.suggest('建议模式');
    expect(infoSpy).toHaveBeenCalled();
  });

  test('警告模式', () => {
    const infoSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    p.error('警告模式');
    expect(infoSpy).toHaveBeenCalled();
  });

  test('对象', () => {
    const infoSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    p.info({ content: '测试名' });
    expect(infoSpy).toHaveBeenCalled();
  });

  test('数字', () => {
    const infoSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    p.info(1);
    expect(infoSpy).toHaveBeenCalled();
  });
});
