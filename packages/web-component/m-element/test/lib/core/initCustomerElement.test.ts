/**
 * @description
 * @author 阿怪
 * @date 2022/12/20 17:37
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { describe, expect, test } from 'vitest';
import MElement from '../../../lib/MElement';
import { createMElement } from '../../../lib/core/createMElement';
import { MCOPO } from '../../../types/template/props';

const TestElement = class extends MElement {};
type ElementAttribute = {
  testAttribute?: string
}
const TestElementWithProps = class extends MElement implements ElementAttribute {
  public testAttribute = 'hi';

};

describe('initCustomerElement', () => {
  // need use document.createElement...
  const createElement = <T = any>(TestClass: typeof MElement, props?: MCOPO<T>) => {
    createMElement({ name: 'm-test', props })(TestClass);
    return document.createElement('m-test') as MElement & T;
  };


  test('should be defined', () => {
    const element = createElement(TestElement);
    expect(element instanceof HTMLElement).toBeTruthy();
    expect(element.outerHTML).toBe('<m-test></m-test>');
  });

  test('init props(string)', () => {
    const element = createElement<ElementAttribute>(TestElementWithProps, {
      testAttribute: {
        type: String,
        default: 'hi'
      }
    });

    expect(element.testAttribute).toBe('hi');
  });
  test('init props', () => {
    const element = createElement<ElementAttribute>(TestElementWithProps, {
      testAttribute: {
        type: String,
        default: 'hi'
      }
    });

    expect(element.testAttribute).toBe('hi');
  });

  test('set props', () => {
    const element = createElement<ElementAttribute>(TestElement, { testAttribute: { type: String, default: 'hi' } });
    element.setAttribute('testAttribute', 'hello');
    expect(element.testAttribute).toMatch('hello');
  });

});
