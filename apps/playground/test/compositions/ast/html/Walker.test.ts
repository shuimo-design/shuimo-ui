/**
 * @description
 * @author 阿怪
 * @date 2023/4/13 21:14
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, test, expect } from 'vitest';
import HTMLWalker from '../../../../src/compositions/ast/html/HTMLWalker';

const getNextArr = (walker: HTMLWalker) => {
  const arr = [];
  while (!walker.isEnd()) {
    arr.push(walker.next);
  }
  return arr;
};
describe('html ast walker', () => {

  test('init', () => {
    expect(new HTMLWalker('')).toBeTruthy();
  });

  describe('get next', () => {



    test('<div></div>', () => {
      const walker = new HTMLWalker('<div></div>');
      expect(getNextArr(walker)).toEqual(['<', 'div', '>', '<', '/', 'div', '>']);
    });

    test('<div class="hi"></div>', () => {
      const walker = new HTMLWalker('<div class="hi"></div>');
      expect(getNextArr(walker)).toEqual(['<', 'div',' ', 'class', '=', '"', 'hi', '"', '>', '<', '/', 'div', '>']);
    });

  });

  test('test',()=>{
    const walker = new HTMLWalker(`<m-dialog v-model:visible="visible">
  <template v-slot:active >
    <m-button >触发</m-button>
  </template>
  <div>
    <span>hi</span>
    <m-button @click="click">你好，这是按钮</m-button>
  </div>
</m-dialog>`);
    expect(getNextArr(walker)).toMatchInlineSnapshot(`
      [
        "<",
        "m-dialog",
        " ",
        "v-model:visible",
        "=",
        "\\"",
        "visible",
        "\\"",
        ">",
        "
      ",
        " ",
        " ",
        "<",
        "template",
        " ",
        "v-slot:active",
        " ",
        ">",
        "
      ",
        " ",
        " ",
        " ",
        " ",
        "<",
        "m-button",
        " ",
        ">",
        "触发",
        "<",
        "/",
        "m-button",
        ">",
        "
      ",
        " ",
        " ",
        "<",
        "/",
        "template",
        ">",
        "
      ",
        " ",
        " ",
        "<",
        "div",
        ">",
        "
      ",
        " ",
        " ",
        " ",
        " ",
        "<",
        "span",
        ">",
        "hi",
        "<",
        "/",
        "span",
        ">",
        "
      ",
        " ",
        " ",
        " ",
        " ",
        "<",
        "m-button",
        " ",
        "@click",
        "=",
        "\\"",
        "click",
        "\\"",
        ">",
        "你好，这是按钮",
        "<",
        "/",
        "m-button",
        ">",
        "
      ",
        " ",
        " ",
        "<",
        "/",
        "div",
        ">",
        "
      ",
        "<",
        "/",
        "m-dialog",
        ">",
      ]
    `)
  })


});
