/**
 * @description
 * @author 阿怪
 * @date 2023/1/29 11:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, test } from 'vitest';
import { usePopover } from '../../../lib';


describe('popover', () => {

  test('template render right', () => {
    const { options: { template } } = usePopover();
    expect(template).matchSnapshot();
    expect(template.slots).matchSnapshot();
  })


})
