/**
 * @description for lit, 'html string template function' required 'strings value',
 *              but 'strings value' is not an array, it's a TemplateStringsArray.
 *              so this is a simple class to implement TemplateStringsArray.
 * @author 阿怪
 * @date 2023/2/10 09:37
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export class MStrings extends Array implements TemplateStringsArray {
  raw: string[] = [];

  constructor(n?: number) {
    super(n ?? 0);
  }

  clear() {
    this.length = 0;
    this.raw.length = 0;
  }

  add(s: string) {
    this.push(s);
    this.raw.push(s);
  }

  modify(index: number, s: string) {
    this[index] = s;
    this.raw[index] = s;
  }

  remove(index: number) {
    super.splice(index, 1);
    this.raw.splice(index, 1);
  }

  addition(s: string, index?: number) {
    if (this.length === 0) {
      console.error('Strings.addition: length is 0, please use Strings.add() first.');
      return;
    }
    this[index ?? this.length - 1] += s;
    this.raw[index ?? this.length - 1] += s;
  }

  insert(index: number, s: MStrings) {
    s.forEach((str, index) => {
      if (index === 0 && this.length !== 0) {
        this.addition(str, this.length - 2);
      } else {
        this.splice(this.length - 1, 0, str);
      }
    });
  }
}

export const createMStrings = (s?: string[]) => {
  const m = new MStrings();
  if (s) {
    m.push(...s);
    m.raw = s;
  }
  return m;
};
