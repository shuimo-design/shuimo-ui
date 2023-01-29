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
import { MCOPO } from '@shuimo-design/types';

const TestElement = class extends MElement {};
type ElementAttribute = {
  testAttribute?: string
}
const TestElementWithProps = class extends MElement implements ElementAttribute {
  public testAttribute = 'hi';

  constructor() {super();}
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

  describe('props', () => {
    test('init props', () => {
      const element = createElement<ElementAttribute>(TestElementWithProps, {
        testAttribute: { type: String, default: 'hi' }
      });
      /**
       * just constructor, attribute not set yet.
       * in browser, when use web component in pure html environment, attribute will be set.
       * but in some framework, like vue, element will be created by document.createElement, like this test.
       */
      expect(element.testAttribute).toBe(null);
    });

    test('set props', () => {
      const element = createElement<ElementAttribute>(TestElement, { testAttribute: { type: String, default: 'hi' } });
      element.setAttribute('testAttribute', 'hello');
      expect(element.testAttribute).toBe('hello');
      expect(element.outerHTML).toBe('<m-test testattribute="hello"></m-test>');
    });
  });


  describe.skip('shadow', () => {

    test('auto add shadow root', () => {
      const element = createElement(TestElement);
      expect(element.shadowRoot).toBeDefined();
    });


  });

});
