/**
 * @description quadrilateral options test
 * @author 阿怪
 * @date 2023/6/23 18:43
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo perfect test case
 */


import { describe, expect, test } from 'vitest';
import useQuadrilateralOptions from '../../../compositions/quadrilateral/useQuadrilateralOptions.ts';

describe('quadrilateral options test', () => {

  describe('only lines', () => {
    describe('string type', () => {

      describe('abbreviation', () => {
        test('abbreviation 1', () => {
          const res = useQuadrilateralOptions({ points: '90' });
          expect(res).toMatchObject({ A: { deg: 90 }, B: { deg: 90 }, C: { deg: 90 }, D: { deg: 90 } });
        });
        test('abbreviation 2', () => {
          const res = useQuadrilateralOptions({ points: '90 180' });
          expect(res).toMatchObject({ A: { deg: 90 }, B: { deg: 180 }, C: { deg: 90 }, D: { deg: 180 } });
        });
        test('abbreviation 3', () => {
          const res = useQuadrilateralOptions({ points: '90 180 270' });
          expect(res).toMatchObject({ A: { deg: 90 }, B: { deg: 180 }, C: { deg: 270 }, D: { deg: 180 } });
        });
        test('no abbreviation', () => {
          const res = useQuadrilateralOptions({ points: '90 180 270 0' });
          expect(res).toMatchObject({ A: { deg: 90 }, B: { deg: 180 }, C: { deg: 270 }, D: { deg: 0 } });
        });
      });

      test('deg number', () => {
        const res = useQuadrilateralOptions({ points: '90deg' });
        expect(res.A).toMatchObject({ deg: 90 });
      });

    });

    describe('number type', () => {
      test('number', () => {
        const res = useQuadrilateralOptions({ points: 90 });
        expect(res.A).toMatchObject({ deg: 90 });
      });
    });
  });


  test('replace abbreviation result', () => {
    const res = useQuadrilateralOptions({ points: '0', A: 90, B: '10deg', C: 1 });
    expect(res.A).toMatchObject({ deg: 90 });
    expect(res.B).toMatchObject({ deg: 10 });
    expect(res.C).toMatchObject({ deg: 1 });
    expect(res.D).toMatchObject({ deg: 0 });
  });


});
