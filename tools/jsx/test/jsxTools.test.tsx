/**
 * @description core jsx tools test
 * @author 阿怪
 * @date 2023/1/29 04:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, test } from 'vitest';


describe('for web-component', () => {

  test('empty div', () => {
    const div = <div/>;
    expect(div).toMatchSnapshot();
  });

  test('div with innerText', () => {
    const div = <div>hello</div>;
    expect(div).toMatchSnapshot();
  });

  describe('slot',()=>{
    test('div with slot', () => {
      const div = <div><slot/></div>;
      expect(div).toMatchSnapshot();
    });

    test('slot has name', () => {
      const div = <div><slot name="content"/></div>;
      expect(div).toMatchSnapshot();
    });

    test('slot has name and default', () => {
      const div = <div>
        <slot/>
        <slot m-name="content"/>
      </div>;
      expect(div).toMatchSnapshot();
    })
  })

});
