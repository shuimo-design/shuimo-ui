/**
 * @description get dom test
 * @author 阿怪
 * @date 2023/4/13 22:56
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, test, expect } from 'vitest';
import HTMLWalker from '../../../../src/compositions/ast/html/HTMLWalker';
import { getDom } from '../../../../src/compositions/ast/html/getDom';


describe('get dom', () => {

  describe('only dom', () => {

    test('empty dom', () => {
      const walker = new HTMLWalker('<div></div>');
      expect(getDom(walker)).toEqual({ name: 'div' });
    });

    test('error empty dom', () => {
      const walker = new HTMLWalker('<div<>');
      expect(() => getDom(walker)).toThrowError();
    });


  });

  describe('with attr', () => {
    test('single attr', () => {
      const walker = new HTMLWalker('<div class="hi"></div>');
      expect(getDom(walker)).toEqual({
        name: 'div',
        attrs: {
          class: 'hi'
        }
      });
    });

    test('boolean attr', () => {
      const walker = new HTMLWalker('<div disabled></div>');
      expect(getDom(walker)).toEqual({
        name: 'div',
        attrs: {
          disabled: ''
        }
      });
    });

    test('multiple attr', () => {
      const walker = new HTMLWalker('<div class="hi" disabled></div>');
      expect(getDom(walker)).toEqual({
        name: 'div',
        attrs: {
          class: 'hi',
          disabled: ''
        }
      });
    });

    test('with v-model:visible', () => {
      const walker = new HTMLWalker('<div v-model:visible="hi"></div>');
      expect(getDom(walker)).toEqual({
        name: 'div',
        attrs: {
          'v-model:visible': 'hi'
        }
      });
    });

    test('with v-model:active without equal character', () => {
      const walker = new HTMLWalker('<div v-slot:active></div>');
      expect(getDom(walker)).toEqual({
        name: 'div',
        attrs: {
          'v-slot:active': ''
        }
      });
    });

    test('with @click', () => {
      const walker = new HTMLWalker('<div @click="hi"></div>');
      expect(getDom(walker)).toEqual({
        name: 'div',
        attrs: {
          '@click': 'hi'
        }
      });
    });

  });

  describe('with innerHTML', () => {

    test('only text', () => {
      const walker = new HTMLWalker('hello world');
      expect(getDom(walker)).toEqual({ name: 'text', innerHTML: 'hello world' });
    });

    test('<div>hi</div>', () => {
      const walker = new HTMLWalker('<div>hi</div>');
      expect(getDom(walker)).toEqual({
        name: 'div',
        innerHTML: 'hi'
      });
    });

    test('<div>hello world</div>', () => {
      const walker = new HTMLWalker('<div>hello world</div>');
      expect(getDom(walker)).toEqual({
        name: 'div',
        innerHTML: 'hello world'
      });
    });

    test('<div>hello <span>world</span></div>', () => {
      const walker = new HTMLWalker('<div>hello <span>world</span></div>');
      expect(getDom(walker)).toEqual({
        name: 'div',
        children: [
          {
            name: 'p_text',
            innerHTML: 'hello'  // todo fix trim
          },
          {
            name: 'span',
            innerHTML: 'world'
          }
        ]
      });
    });

    test('multiple children', () => {
      const walker = new HTMLWalker('<div>hello <span>world</span><div>hi</div></div>');
      expect(getDom(walker)).toEqual({
        name: 'div',
        children: [
          { name: 'p_text', innerHTML: 'hello' },
          { name: 'span', innerHTML: 'world' },
          { name: 'div', innerHTML: 'hi' }
        ]
      });
    });

    test('template with slot', () => {
      const walker = new HTMLWalker(`
<m-dialog v-model:visible="visible">
  <template v-slot:active >
    <m-button >触发</m-button>
  </template>
</m-dialog>`);
      expect(getDom(walker)).toMatchObject({
        name: 'm-dialog',
        attrs: {
          'v-model:visible': 'visible'
        },
        children: [
          {
            name: 'template',
            attrs: { 'v-slot:active': '' },
            children: [{ innerHTML: '触发', name: 'm-button' }]
          }
        ]
      });
    });

  });

  test('demo', () => {
    expect(getDom(new HTMLWalker(`
<m-dialog v-model:visible="visible">
  <template v-slot:active >
    <m-button >触发</m-button>
  </template>
  <div>
    <span>hi</span>
    <m-button @click="click">你好，这是按钮</m-button>
  </div>
</m-dialog>
`))).toMatchInlineSnapshot(`
  {
    "attrs": {
      "v-model:visible": "visible",
    },
    "children": [
      {
        "attrs": {
          "v-slot:active": "",
        },
        "children": [
          {
            "innerHTML": "触发",
            "name": "m-button",
          },
        ],
        "name": "template",
      },
      {
        "children": [
          {
            "innerHTML": "hi",
            "name": "span",
          },
          {
            "attrs": {
              "@click": "click",
            },
            "innerHTML": "你好，这是按钮",
            "name": "m-button",
          },
        ],
        "name": "div",
      },
    ],
    "name": "m-dialog",
  }
`);
  });
});

