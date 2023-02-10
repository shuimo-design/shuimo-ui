/**
 * @description web component jsxTools test
 * @author 阿怪
 * @date 2023/2/9 17:28
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, test } from 'vitest';

// you should run this test use package script
describe('web component jsxToos test', () => {

  test('empty div', () => {
    const div = <div></div>;
    const { strings, values } = div;
    expect(strings[0]).toEqual(`<div></div>`);
    expect(values).toEqual([]);
  });

  test('pure test mWC',()=>{
    const value = 'test';
    console.warn(<div id="hi" value={value} onClick={()=>'hi'}>
      <span>hi</span>
    </div>);
  })

  describe.skip('with props', () => {

    test('simple one props', () => {
      const div = <div id="test"></div>;
      const { strings, values } = div;
      expect(strings[0]).toEqual(`<div id="test" ></div>`);
      expect(values).toMatchObject([]);
    });


    test('value props', () => {
      const value = 'test';
      const div = <div id="id" value={value}></div>;
      const { strings, values } = div;
      expect(strings[0]).toEqual(`<div id="id" value="test" ></div>`);
      expect(values).toMatchObject([]);
    });

    test('func props', () => {
      const value = 'test';
      const func = () => { };
      const div = <div id="test" value={value} onClick={func}></div>;
      const { strings, values } = div;
      expect(strings[0]).toEqual(`<div id="test" value="test"  @click="`);
      expect(strings[1]).toEqual(`" ></div>`);
      expect(values[0]).toMatchObject({ name: 'click', value: func });
    });

  });

  describe.skip('with children', () => {
    test('simple one div children', () => {
      const div = <div>
        <div></div>
      </div>;
      const { strings, values } = div;
      expect(strings[0]).toEqual(`<div ><div ></div></div>`);
      expect(values).toEqual([]);
    });

    test('child with slot info', () => {
      const value = 'child slot info';
      const div = <div>
        <div>{value}</div>
      </div>;
      const { strings, values } = div;
      expect(strings[0]).toEqual(`<div ><div >child slot info</div></div>`);
    });

    test('child with props', () => {
      const value = 'test';
      const div = <div>
        <div id="test" value={value}></div>
      </div>;
      const { strings, values } = div;
      expect(strings[0]).toEqual(`<div ><div id="test" value="test" ></div></div>`);
    });


  });

});
