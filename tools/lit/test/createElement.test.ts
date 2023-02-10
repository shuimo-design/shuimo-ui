/**
 * @description createElement test
 * @author 阿怪
 * @date 2023/2/10 11:34
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { describe, expect, test } from 'vitest';
import { MElement } from '../lib/MElement';
import { createMElement } from '../lib/createElement';
import {
  useBaseComponent,
  useChildrenComponent,
  useEventPropComponent,
  useValuePropComponent
} from './common/useComponentHook';
import { property } from 'lit/decorators.js';

describe('createElement', () => {

  describe.skip('base component', () => {
    @createMElement({
      name: 'm-test',
      hookFunc: useBaseComponent
    })
    class c extends MElement {}

    test('init Element', () => {
      const c1 = new c();
      expect(c1).toBeInstanceOf(MElement);
    });

    test('getTemplate', () => {
      const c1 = new c();
      console.warn(c1.getTemplate());
    });

  });

  describe('value prop component', () => {
    @createMElement({
      name: 'm-test-value',
      hookFunc: useValuePropComponent
    })
    class cValue extends MElement {
      @property({ type: String })
      id: string = 'hello';
    }

    test('getTemplate', () => {
      const c1 = new cValue();
      const { strings } = c1.getTemplate();
      expect(strings.raw).toMatchObject(['<div id="hello" class="m-component"></div>']);
    });
  });

  describe('event props component', function () {
    @createMElement({
      name: 'm-test-event',
      hookFunc: useEventPropComponent
    })
    class cEvent extends MElement {
      onClick() {
        console.log('hi');
      }
    }

    test('getTemplate', () => {
      const c1 = new cEvent();
      const { strings, values } = c1.getTemplate();
      expect(strings[0]).toMatchObject('<div @click="');
      expect(strings[1]).toMatchObject('"></div>');
      expect(values[0]).toMatchObject({ name: 'onClick', value: c1.onClick });
    });

  });

  describe('with children', function () {
    test('with simple children', () => {

      @createMElement({
        name: 'm-test-children',
        hookFunc: useChildrenComponent
      })
      class cChildren extends MElement {}

      const c1 = new cChildren();
      const { strings } = c1.getTemplate();
      console.log(strings);

    });
  });


});
