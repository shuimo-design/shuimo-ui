/**
 * @description
 * @author 阿怪
 * @date 2023/7/19 00:43
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { test, describe } from 'vitest';
import { initBoundary } from '../../../lib/template/VirtualList/useVirtualList';

describe('useVirtualList', () => {

  describe('from and end init', () => {

    const total = 120;

    test('from = 0 ', () => {
      const res = initBoundary({
        from: 0,
        total,
        visibleCount: 8,
        overScanCoefficient: 1
      });
      console.log(res);
    });

    test('from = 10 ', () => {
      const res = initBoundary({
        from: 10,
        total,
        visibleCount: 8,
        overScanCoefficient: 1
      });
      console.log(res);
    });

    test('from = 20 ', () => {
      const res = initBoundary({
        from: 20,
        total,
        visibleCount: 8,
        overScanCoefficient: 1
      });
      console.log(res);
    });


  });


  describe('get action', () => {

  });


});
