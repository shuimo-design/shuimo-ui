/**
 * @description MRef test
 * @author 阿怪
 * @date 2023/6/24 17:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, test, expect } from 'vitest';
import { MRef } from "../../../composition/common/MRef";


describe('MRef test', function () {

  const vueVal = {value: 1};
  describe('init', () => {

    test('vue ref', () => {
      const mRefVal = MRef(vueVal);
      expect(mRefVal.value).toBe(1);
    });

  })

  describe('set', function () {

    test('set value', () => {
      const mRefVal = MRef(vueVal);
      mRefVal.value = 2;
      expect(mRefVal.value).toBe(2);
    })

  });

});
