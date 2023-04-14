/**
 * @description HTML walker
 * @author 阿怪
 * @date 2023/4/13 21:12
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * auto skip space and '\n'
 * next will return a word
 */
import { HTMLDelimiter } from './HTMLDelimiter';

export const END_CODES = Object.values(HTMLDelimiter) as string[];

export default class HTMLWalker {
  code: string;
  index: number = 0;
  length: number = 0;

  constructor(code?: string) {
    if (!code) {code = '';}
    this.code = code;
    this.length = code.length;
    this.index = 0;
  }

  get current() {
    return this.code[this.index];
  }

  skipEmpty() {
    while (
      this.current === '' ||
      this.current === undefined ||
      this.current === HTMLDelimiter.SPACE ||
      this.current === HTMLDelimiter.NEW_LINE ) {
      this.nextCode();
      if (this.index >= this.length) {
        break;
      }
    }
  }

  isEnd() {
    return this.length === this.index;
  }

  nextCode() {
    return this.code[++this.index];
  }

  /**
   * for debug
   */
  getLeft() {
    return this.code.slice(this.index);
  }

  nextWord() {
    this.skipEmpty();
    return this.next();
  }

  safeNextWord() {
    this.skipEmpty();
    if (this.isEnd()) {
      return '';
    }
    return this.next();
  }

  next() {
    if (this.isEnd()) {
      throw new Error('some error happened...');
    }

    if (END_CODES.includes(this.current)) {
      const word = this.current;
      this.nextCode();
      return word;
    }

    let word = '';
    while (!END_CODES.includes(this.current) && !this.isEnd()) {
      word += this.current;
      this.nextCode();
    }

    return word;
  }


}
