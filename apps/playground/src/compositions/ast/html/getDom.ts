/**
 * @description get a dom
 * @author 阿怪
 * @date 2023/4/13 22:46
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import HTMLWalker from './HTMLWalker';
import { HTMLDelimiter } from './HTMLDelimiter';

const HTMLDelimiterArr = Object.values(HTMLDelimiter) as string[];

const NAME_END_DELIMITER = [HTMLDelimiter.SPACE, HTMLDelimiter.GT, HTMLDelimiter.SLASH];

const IS_EMPTY_DELIMITER = [HTMLDelimiter.SPACE, HTMLDelimiter.NEW_LINE];
const NOT_EMPTY_DELIMITER = [HTMLDelimiter.LT, HTMLDelimiter.GT, HTMLDelimiter.SLASH, HTMLDelimiter.EQUAL, HTMLDelimiter.DOUBLE_QUOTE];


/**
 * get a dom
 * @param walker
 */
export const getDom = (walker: HTMLWalker): DOMAst => {
  walker.skipEmpty();
  let word = walker.current;
  let name = '';
  let next: HTMLDelimiter | string;
  // dom must start with '<'
  let innerHTML = '';


  const getName = () => {
    let name = walker.nextWord();

    if (name.length === 1 && HTMLDelimiterArr.includes(name)) {
      throw new Error(`tag name can not be a delimiter, name is ${name}`);
    }

    next = walker.next();
    if (!NAME_END_DELIMITER.includes(next as HTMLDelimiter)) {
      throw new Error(`tag name must be end with space or > or /, name is ${name}, next code is ${next}`);
    }
    return name;
  };

  const getAttrValue = () => {
    next = walker.next();
    if (NAME_END_DELIMITER.includes(next as HTMLDelimiter)) {
      return '';
    } else if (next === HTMLDelimiter.EQUAL) {
      next = walker.next();
      if (next === HTMLDelimiter.DOUBLE_QUOTE) {
        next = walker.nextWord();
        if (HTMLDelimiterArr.includes(next)) {throw new Error('attr value can not be a delimiter');}
        let value = next;
        next = walker.nextWord();
        if (next !== HTMLDelimiter.DOUBLE_QUOTE) {throw new Error('attr value must be end with "');}
        next = walker.nextWord();
        return value;
      }
    }
    throw new Error(`attr value init error , next code is ${next}`);
  };

  const getAttribute = () => {
    next = walker.nextWord();
    const attr: Attrs = {};
    while (![HTMLDelimiter.GT, HTMLDelimiter.SLASH].includes(next as HTMLDelimiter)) {
      const attrName = next;
      attr[attrName] = getAttrValue();
      while (next === HTMLDelimiter.SPACE) {
        next = walker.next();
      }
    }

    return { attr, next };
  };

  const getInnerHTML = () => {
    let innerHTML = '';
    next = walker.next();
    const children: DOMAst[] = [];
    if (next !== HTMLDelimiter.LT) {
      // must be text
      if (NOT_EMPTY_DELIMITER.includes(next as HTMLDelimiter)) {throw new Error(`${next} can not be innerHTML`);}
      innerHTML = next;
      try {
        while ((next = walker.next()) && next !== HTMLDelimiter.LT) {
          innerHTML += next;
        }
      } catch (e) {
        // if walker is end, throw error
        throw new Error(`innerHTML error, next code is ${next}`);
      }
    }

    // innerHTML next must include '<' => means dom must close.
    // but when next is '<', the possible situation is a dom or end tag
    next = walker.next();
    while (next !== HTMLDelimiter.SLASH) {

      if (innerHTML.trim() !== '') {
        children.push({ name: 'p_text', innerHTML });
        innerHTML = '';
      }

      // means not end tag
      const name = next;
      next = walker.next();
      const res = getDomInfo(walker, name);
      children.push(res.domAst);
      next = walker.nextWord(); // name or end tag
      if (next === HTMLDelimiter.LT) {
        next = walker.nextWord();
      }
    }


    return {
      innerHTML,
      children
    };
  };

  /**
   * after get dom name and next, get dom info
   * @param walker
   * @param name
   */
  const getDomInfo = (walker: HTMLWalker, name: string) => {
    let attribute: Attrs = {};
    let innerHTML = '';
    const children: DOMAst[] = [];


    if (next === HTMLDelimiter.SPACE) {
      const attrInfo = getAttribute();
      attribute = attrInfo.attr;
      next = attrInfo.next;
    }

    if (next === HTMLDelimiter.GT) {
      const innerHTMLInfo = getInnerHTML();

      if (innerHTMLInfo.innerHTML) {
        innerHTML = innerHTMLInfo.innerHTML;
      }
      if (innerHTMLInfo.children.length) {
        innerHTMLInfo.children.forEach((child) => {

          // for react slot
          if (child.name === 'template' && child.attrs) {
            const V_SLOT_STR = 'v-slot:';
            const slotAttrNameIndex = Object.keys(child.attrs).findIndex(a => a.startsWith(V_SLOT_STR));
            const slotAttrNameStr = Object.keys(child.attrs)[slotAttrNameIndex];
            if (slotAttrNameStr) {
              const slotAttr = slotAttrNameStr.replace(V_SLOT_STR, '');
              if (!child.children || child.children.length !== 1) {
                throw new Error('slot must have one child');
              }
              // only support one child
              attribute[slotAttr] = child.children[0];
            }
          } else {
            children.push(child);
          }
        });
      }
    }


    const domAst: DOMAst = { name };

    if (Object.keys(attribute).length) {
      domAst.attrs = attribute;
    }
    if (innerHTML) {
      domAst.innerHTML = innerHTML;
    }
    if (children.length) {
      domAst.children = children;
    }


    // end tag
    if (next === HTMLDelimiter.SLASH) {
      const domName = walker.next();
      if (domName !== name) {throw new Error(`end tag name must be ${name},current is ${domName}`);}
      next = walker.next();
      while (IS_EMPTY_DELIMITER.includes(next as HTMLDelimiter)) {
        (next = walker.next());
      }
      if (next !== HTMLDelimiter.GT) {throw new Error('end tag must be end with >');}
      if (!walker.isEnd()) {
        next = walker.safeNextWord();
      }
    }

    return {
      domAst,
      next
    };
  };


  if (word !== '<') {
    while (word !== '<' && !walker.isEnd()) {
      innerHTML += walker.next();
      word = walker.current;
    }
    return { name: 'text', innerHTML };
  }

  // skip '<'
  walker.next();
  // get tag name
  name = getName();
  const res = getDomInfo(walker, name);
  return res.domAst;
};
