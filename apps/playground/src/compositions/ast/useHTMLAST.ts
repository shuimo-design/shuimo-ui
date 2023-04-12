/**
 * @description a simple html ast hook. ** only for react **
 * @author 阿怪
 * @date 2023/4/7 14:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * need help... I need an elegant and lightweight browser-side AST parser
 */
import { MError } from '../../plugins/console';

type Attrs = Record<string, string>;
type DOMAst = {
  name: string,
  attrs?: Attrs,
  innerHTML?: string,
  children?: Array<DOMAst>
}

type StateType = 'default' | 'start-tag' | 'close-tag' | 'end-tag' | 'inner-html' | 'attr-name' | 'attr-value';

enum STATE {
  DEFAULT = 'default',
  START_TAG = 'start-tag',
  CLOSE_TAG = 'close-tag',
  END_TAG = 'end-tag',
  INNER_HTML = 'inner-html',
  ATTR_NAME = 'attr-name',
  ATTR_VALUE = 'attr-value'
}

class Walker {
  code: string;
  index: number = -1;
  length: number = 0;
  _type: StateType = 'default';

  get type() {
    return this._type;
  }

  set type(type: StateType) {
    this._type = type;
  }

  constructor(code?: string) {
    if (!code) {code = '';}
    this.code = code;
    this.length = code.length;
    this.index = -1;
  }

  next() {
    if (this.isEnd()) {
      throw new Error('some error happened...');
    }
    return this.code[++this.index];
  }

  back() {
    this.index--;
  }

  isEnd() {
    return this.length === this.index;
  }

  getNext2() {
    return `${this.code[this.index + 1]}${this.code[this.index + 2]}`;
  }

  getNext() {
    return this.code[this.index + 1];
  }

  /**
   * for debug
   */
  getLeft() {
    return this.code.slice(this.index);
  }
}

export default function useHTMLAst() {


  const parseDom = (walk: Walker) => {
    let tagName = '';
    const attrs: Attrs = {};
    let innerHTML = '';
    let children: Array<DOMAst> = [];
    // get dom name
    const getName = () => {
      const char = walk.next();
      if (char === ' ') {
        walk.type = STATE.ATTR_NAME;
        return;
      }
      if (char === '>') {
        walk.type = STATE.INNER_HTML;
        return;
      }
      if (char === '/') {
        walk.type = STATE.CLOSE_TAG;
        return;
      }
      tagName += char;
      getName();
    };
    const getAttrs = () => {
      if (walk.type === STATE.CLOSE_TAG) {return;}
      if (walk.type === STATE.INNER_HTML) {return;}

      let char = walk.next();
      if (char === '>') {
        walk.type = STATE.INNER_HTML;
        return;
      }
      if (char === '/') {
        walk.type = STATE.CLOSE_TAG;
        return;
      }
      if (char === ' ') {
        getAttrs();
        return;
      }
      let attrName = '';
      let attrValue = '';
      const getAttrName = () => {
        attrName += char;
        char = walk.next();
        if (char === '=') {
          walk.type = STATE.ATTR_VALUE;
          return;
        }
        if (char === '>') {
          attrs[attrName] = '';
          walk.type = STATE.INNER_HTML;
          return;
        }
        if (char === '/') {
          attrs[attrName] = '';
          walk.type = STATE.CLOSE_TAG;
          return;
        }
        if (char === ' ') {
          attrs[attrName] = '';
          return;
        }
        getAttrName();
      };
      getAttrName();
      const getAttrValue = () => {
        if (walk.type !== STATE.ATTR_VALUE) {return;}
        char = walk.next();
        if (char !== '"' && char !== `'`) { MError('attr value must be in "" or \'\''); }
        while ((char = walk.next()) && char !== '"' && char !== `'`) {
          attrValue += char;
        }
        attrs[attrName] = attrValue;
      };
      getAttrValue();
      getAttrs();
    };
    const getEndTag = () => {
      if (walk.type !== STATE.END_TAG) {return;}
      let char = walk.next();
      while (char !== '>') {
        char = walk.next();
      }
      walk.next();
    };
    const getInnerHTML = () => {
      if (walk.type !== STATE.INNER_HTML) {return;}

      let char = walk.next();
      while (true) {
        // child dom
        if (char === '<') {
          if (walk.getNext() === ' ' || walk.getNext().charCodeAt(10)) {
            walk.next();
            continue;
          }
          if (walk.getNext() !== '/') {
            walk.type = STATE.DEFAULT;
            const res = parseDom(walk);
            walk = res.walk;
            children.push(res.dom);
            walk.type = STATE.INNER_HTML;
            char = walk.next();
            continue;
          }
          walk.type = STATE.END_TAG;
          walk.next();
          break;
        }
        innerHTML += char;
        char = walk.next();
      }
    };
    getName();
    // get attrs
    getAttrs();


    // if next is </, it's end tag
    if (walk.getNext2() === '</') {
      walk.type = STATE.END_TAG;
    } else {
      // get innerHTML
      getInnerHTML();
    }

    // close dom
    getEndTag();

    const dom: DOMAst = { name: tagName };
    if (Object.keys(attrs).length > 0) {
      dom.attrs = attrs;
    }
    if (innerHTML !== '') {
      dom.innerHTML = innerHTML;
    }
    if (children.length > 0) {
      dom.children = children;
    }

    return {
      walk,
      dom
    };
  };

  const parse = (code: string) => {

    let walk = new Walker(code);
    const ast = [];
    while (!walk.isEnd()) {
      const char = walk.next();
      if (char === undefined) {break;}
      if (char === ' ') {
        continue;
      }
      if (walk.type === STATE.DEFAULT) {
        if (char === '<') {
          const res = parseDom(walk);
          walk = res.walk;
          ast.push(res.dom);
        } else {
          if (char.charCodeAt(0) === 10) {
            continue;
          }
          // to empty tag
          MError(`not support empty tag right now, char:${char},ascii:${char.charCodeAt(0)}`);
        }
        continue;
      }
      if (walk.type === STATE.END_TAG) {
        walk.type = STATE.DEFAULT;
        walk.back();
      } else {
        MError(`error type: ${walk.type}`);
      }
    }
    return ast;
  };


  return {
    parse
  };

}
