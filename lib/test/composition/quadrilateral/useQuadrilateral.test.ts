/**
 * @description quadrilateral hook test
 * @author 阿怪
 * @date 2023/6/22 04:47
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, test } from 'vitest';
import { ResPoint } from '../../../compositions/quadrilateral/algorithm/common.ts';
import useQuadrilateral from '../../../compositions/quadrilateral/useQuadrilateral.ts';


describe('quadrilateral test', () => {
  const checkQuadrilateral = (options: { A: ResPoint, B: ResPoint, C: ResPoint, D: ResPoint } | undefined) => {
    if (options) {
      // expect all number not NaN
      expect(options.A.x).not.toBeNaN();
      expect(options.A.y).not.toBeNaN();
      expect(options.B.x).not.toBeNaN();
      expect(options.B.y).not.toBeNaN();
      expect(options.C.x).not.toBeNaN();
      expect(options.C.y).not.toBeNaN();
      expect(options.D.x).not.toBeNaN();
      expect(options.D.y).not.toBeNaN();

      // all length > 0
      expect(options.A.length).toBeGreaterThan(0);
      expect(options.B.length).toBeGreaterThan(0);
      expect(options.C.length).toBeGreaterThan(0);
      expect(options.D.length).toBeGreaterThan(0);

    }
  };

  describe('deg mode', () => {

    test('options test', () => {
      useQuadrilateral({ w: 2, h: 2, options: { points: 45 } });
      useQuadrilateral({ w: 2, h: 2, options: { points: 30 } });
      useQuadrilateral({ w: 2, h: 2, options: { points: '0 0 30 0' } });
      useQuadrilateral({ w: 2, h: 2, options: { points: '0 30' } });
      useQuadrilateral({ w: 2, h: 2, options: { points: '0 30 0 0' } });
      useQuadrilateral({ w: 2, h: 2, options: { points: '20 0 0 0' } });
      useQuadrilateral({ w: 2, h: 2, options: { a: 20 } });
    });

    test('negative deg', () => {
      const resA = useQuadrilateral({ w: 2, h: 2, options: { a: -10 } });
      checkQuadrilateral(resA);
      const resB = useQuadrilateral({ w: 2, h: 2, options: { b: -10 } });
      checkQuadrilateral(resB);
      const resC = useQuadrilateral({ w: 2, h: 2, options: { c: -10 } });
      checkQuadrilateral(resC);
      const resD = useQuadrilateral({ w: 2, h: 2, options: { d: -10 } });
      checkQuadrilateral(resD);
    });


    describe('TLE CASE', () => {

      test('0111, A is negative', () => {
        const res = useQuadrilateral({ w: 100, h: 100, options: { a: -30, b: 30, c: 30, d: 30 } });
        checkQuadrilateral(res);
      });

      test('0011, A,B is negative', () => {
        const res = useQuadrilateral({ w: 100, h: 100, options: { a: -30, b: -30, c: 30, d: 30 } });
        checkQuadrilateral(res);
      });

      test('0001, A,B,C is negative', () => {
        const res = useQuadrilateral({ w: 100, h: 100, options: { a: -30, b: -30, c: -30, d: 30 } });
        checkQuadrilateral(res);
      });

    });

    describe('BLE CASE', () => {

      test('1110, D is negative', () => {
        const res = useQuadrilateral({ w: 100, h: 100, options: { a: 30, b: 30, c: 30, d: -30 } });
        checkQuadrilateral(res);
      });

      test('0110,A,D is negative', () => {
        const res = useQuadrilateral({ w: 100, h: 100, options: { a: -30, b: 30, c: 30, d: -30 } });
        checkQuadrilateral(res);
      });

      test('0010, A B D is negative', () => {
        const res = useQuadrilateral({ w: 100, h: 100, options: { a: -30, b: -30, c: 30, d: -30 } });
        checkQuadrilateral(res);
      });
    });

    describe('TRE CASE', function () {

      test('1011, B is negative', () => {
        const res = useQuadrilateral({ w: 100, h: 100, options: { a: 30, b: -30, c: 30, d: 30 } });
        checkQuadrilateral(res);
      });

      test('1001, B,C is negative', () => {
        const res = useQuadrilateral({ w: 100, h: 100, options: { a: 30, b: -30, c: -30, d: 30 } });
        checkQuadrilateral(res);
      });

      test('1000, B,C,D is negative', () => {
        const res = useQuadrilateral({ w: 100, h: 100, options: { a: 30, b: -30, c: -30, d: -30 } });
        checkQuadrilateral(res);
      });


    });

    describe('BRE CASE', function () {

      test('1101, C is negative', () => {
        const res = useQuadrilateral({ w: 100, h: 100, options: { a: 30, b: 30, c: -30, d: 30 } });
        checkQuadrilateral(res);
      });

      test('1100, C,D is negative', () => {
        const res = useQuadrilateral({ w: 100, h: 100, options: { a: 30, b: 30, c: -30, d: -30 } });
        checkQuadrilateral(res);
      });

      test('0100, A,C,D is negative', () => {
        const res = useQuadrilateral({ w: 100, h: 100, options: { a: -30, b: 30, c: -30, d: -30 } });
        checkQuadrilateral(res);
      });


    });

    describe('TL_BRE CASE', function () {
      test('0101, A,C is negative', () => {
        const res = useQuadrilateral({ w: 100, h: 100, options: { a: -30, b: 30, c: -30, d: 30 } });
        checkQuadrilateral(res);
      });
    });

    describe('TR_BLE_CASE', function () {
      test('1010, B,D is negative', () => {
        const res = useQuadrilateral({ w: 100, h: 100, options: { a: 30, b: -30, c: 30, d: -30 } });
        checkQuadrilateral(res);
      });
    });

    describe('ALL', function () {
      test('1111', () => {
        const res = useQuadrilateral({ w: 100, h: 100, options: { a: 45, b: 45, c: 45, d: 45 } });
        checkQuadrilateral(res);
      });
      test('0000', () => {
        const res = useQuadrilateral({ w: 100, h: 100, options: { a: -45, b: -45, c: -45, d: -45 } });
        checkQuadrilateral(res);
      });
    });

  });


});
