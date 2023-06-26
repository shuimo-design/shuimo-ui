/**
 * @description Effect test
 * @author 阿怪
 * @date 2023/6/24 19:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, test, expect } from 'vitest';
import { MRef } from "../../../composition/common/MRef";
import Effect from "../../../composition/common/effect";


describe('Effect test', function () {

  test('base test', function () {

    const ref = MRef({value: 1});
    let val = 0;
    Effect.register(ref, () => {
      val++;
    })

    ref.value = 2;

    expect(val).toBe(1);


  });

});
