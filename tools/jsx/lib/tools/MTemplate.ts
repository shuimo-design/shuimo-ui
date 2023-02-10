/**
 * @description Template Class
 * @author 阿怪
 * @date 2023/2/10 10:24
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * web component jsxTools will return this
 */
import { createMStrings, MStrings } from './MStrings';
import { ValueResult } from '../../types';
import { MProps } from './MProps';

export class MTemplate {
  strings: MStrings = new MStrings();
  values: ValueResult[] = [];

  children?: Array<MTemplate | MProps | MTemplate[]>;

  private tagName: string = '';

  private isClosed: boolean = false;

  constructor() {}

  initTag(tagName: string) {
    this.strings.clear();
    const str = `<${tagName}`;
    this.tagName = tagName;
    this.strings.add(str);
  }

  endTag() {
    if (this.isClosed) {
      console.error('this template is closed, please check your code.');
      return;
    }

    this.isClosed = true;
    if (!this.children || this.children.length === 0) {
      this.strings.addition(`></${this.tagName}>`);
      return;
    }
    this.strings.addition('>');
    this.values.push({
      name: '_m_html_children',
      value: '_m_html_children'
    });
    this.strings.add(`</${this.tagName}>`);
  }

  private commonAddProp(addString: string, prop: string, value: string | boolean | Function | MProps) {
    this.strings.addition(addString);
    this.values.push({ name: prop, value });
    this.strings.add('"');
  }

  addProp(prop: string, value: string | boolean | Function | MProps) {
    switch (typeof value) {
      case 'boolean':
        /**
         * props may be a boolean value, like `disabled`, `checked`, `selected`.
         * we should add ? before prop name.
         * according to this: https://lit.dev/docs/templates/expressions/#boolean-attribute-expressions
         */
        this.commonAddProp(` ?${prop}="`, prop, value);
        break;
      case 'function':
        /**
         * props may be a function, like `onClick`, `onInput`, `onChange`.
         */
          // remove `on` prefix
        const eventName = prop.slice(2).toLowerCase();
        this.commonAddProp(` @${eventName}="`, prop, value);
        break;
      default:
        /**
         * string type
         * maybe lit have some magic performance optimization at .value=${value}>
         * But this feature support will consume a lot of time,
         * It is expected to start from the jsx compilation principle of esbuild,
         * for example:
         * <div id={props.id}> => mWC('div',{id:props.id})
         * Due to the underlying characteristics of js, the props.id here will be directly compiled into a value when it enters the method
         * And there are some uncertainties, so we will not proceed with this for the time being.
         */

        if (value instanceof MProps) {
          this.commonAddProp(` .${prop}="`, prop, value);
          break;
        }

        this.commonAddProp(` ${prop}="`, prop, value);

        break;
    }
  }

  addChildren(children: MTemplate['children']) {
    if (this.isClosed) {
      console.error('closed template can not add children, please check your code.');
      return;
    }
    this.children = children;
  }

  flatChildren() {
    if (!this.children || this.children.length === 0) {return;}
    // should after close
    this.children.filter(e => e).map(c => {
      if (!(c instanceof MTemplate)) {

        if (c instanceof MProps) {
          this.strings.insert(this.strings.length - 1, createMStrings(['']));
          this.values.push({ name: c.type!, value: c.value });
        } else {
          if(Array.isArray(c)){
            c.forEach(e=>{
              // optimize code  (...zZZ from higuaifan)
              this.strings.insert(this.strings.length - 1, e.strings);
              this.values.push(...e.values);
            })
          }
        }
        return;
      }


      c.flatChildren();
      this.strings.insert(this.strings.length - 1, c.strings);
      this.values.push(...c.values);
    });
    // after flat child, we always should concat end tag

    const length = this.strings.length;
    this.strings.modify(length - 2, this.strings[length - 2] + this.strings[length - 1]);
    this.strings.remove(length - 1);


    this.children = undefined;
    const valueIndex = this.values.findIndex(v => v.name === '_m_html_children');
    this.values.splice(valueIndex, 1);
  }

}
