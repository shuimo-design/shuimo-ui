/**
 * @description core checkbox test
 * @author 阿怪
 * @date 2023/1/28 14:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import { describe, expect, test } from 'vitest';
import { useCheckbox } from '../../../lib';

describe('core checkbox test', () => {

  describe('template render', () => {
    const { options: { template }, initProps } = useCheckbox();


    test('base template render current', () => {
      expect(template).toMatchSnapshot();
    });

    test('should render children', () => {
      expect(Object.keys(template.children!)).toEqual(['input', 'checkbox', 'checkboxInner', 'label']);
    });

    test('label should have slot in default mode', () => {
      expect(template.children!.label.slots!.size).toBe(1);
    });


  });


  describe('initProps', () => {
    test('set label', () => {
      const { options: { template }, initProps } = useCheckbox();
      initProps({ label: 'test' }, { onClick: () => {} });
      expect(template.children!.label).toMatchInlineSnapshot(`
        {
          "children": {
            "span": {
              "children": {},
              "if": true,
              "initProps": [Function],
              "innerText": [
                "test",
              ],
              "props": null,
              "show": true,
              "slots": Map {},
              "type": "span",
            },
          },
          "if": true,
          "initProps": [Function],
          "innerText": [],
          "props": {
            "class": "m-checkbox-slot",
            "m-name": "label",
          },
          "show": true,
          "slots": Map {},
          "type": "label",
        }
      `);
    });
  });


});
