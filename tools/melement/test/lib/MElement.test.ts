/**
 * @description MElement test
 * @author 阿怪
 * @date 2022/12/20 15:23
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, it } from 'vitest';
import MElement from '../../lib/MElement';

describe('MElement', () => {
  it('should be defined', () => {
    expect(class extends MElement{}).toBeTruthy();
  });

  // describe('provide lifecycle hook', () => {
  //   // test('')
  // });
});
