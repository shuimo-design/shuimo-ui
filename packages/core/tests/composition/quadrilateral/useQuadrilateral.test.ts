/**
 * @description quadrilateral hook test
 * @author 阿怪
 * @date 2023/6/22 04:47
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, test, expect } from 'vitest';
import useQuadrilateral from '../../../composition/quadrilateral/useQuadrilateral';


describe('quadrilateral test', () => {

  describe('deg mode', () => {

    test('', () => {
      useQuadrilateral({ w: 2, h: 2, options: { points: 45 } });
      useQuadrilateral({ w: 2, h: 2, options: { points: 30 } });
      useQuadrilateral({ w: 2, h: 2, options: { points: '0 0 30 0' } });
      useQuadrilateral({ w: 2, h: 2, options: { points: '0 30' } });
      useQuadrilateral({ w: 2, h: 2, options: { points: '0 30 0 0' } });
      useQuadrilateral({ w: 2, h: 2, options: { points: '20 0 0 0' } });
      useQuadrilateral({ w: 2, h: 2, options: { a: 20 } });
    });


  });


});
