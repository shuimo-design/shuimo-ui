/**
 * @description Template Class test
 * @author 阿怪
 * @date 2023/2/10 10:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, test, vi } from 'vitest';
import { MTemplate } from '../../../lib/tools/MTemplate';


describe('Template', () => {

  test('init tag', () => {
    const t = new MTemplate();
    t.initTag('div');
    expect(t.strings.raw).toEqual(['<div']);
    expect(t.strings.length).toBe(1);
  });

  test('end tag', () => {
    const t = new MTemplate();
    t.initTag('div');
    t.endTag();
    expect(t.strings.raw).toEqual(['<div></div>']);
    expect(t.strings.length).toBe(1);
  });

  test('can not end tag twice', () => {
    const infoSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const t = new MTemplate();
    t.initTag('div');
    t.endTag();
    t.endTag();
    expect(infoSpy).toHaveBeenCalled();
  });

  describe('add prop', () => {

    test('string prop', () => {
      const t = new MTemplate();
      t.initTag('div');
      t.addProp('id', 'test');
      t.endTag();
      expect(t.strings.raw).toEqual(['<div id="test"></div>']);
    });

    test('boolean prop', () => {
      const t = new MTemplate();
      t.initTag('div');
      t.addProp('disabled', true);
      expect(t.strings.raw).toEqual(['<div ?disabled="', '"']);
      expect(t.strings.length).toBe(2);
      expect(t.values).toEqual([{ name: 'disabled', value: true }]);
    });

    test('event prop',()=>{
      const t = new MTemplate();
      t.initTag('div');
      const onClick = ()=>{};
      t.addProp('onClick',onClick);
      t.endTag();
      expect(t.strings.raw).toEqual(['<div @click="', '"></div>']);
      expect(t.strings.length).toBe(2);
      expect(t.values).toMatchObject([{ name: 'onClick', value: onClick }]);
    })

  });

  describe('children', () => {
    const child = new MTemplate();
    child.initTag('span');
    child.endTag();

    test('add children', () => {
      const t = new MTemplate();
      t.initTag('div');
      t.addChildren([child]);
      expect(t.children).toEqual([child]);
    });

    test('can not add children after end tag', () => {
      const infoSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const t = new MTemplate();
      t.initTag('div');
      t.endTag();
      t.addChildren([child]);
      expect(infoSpy).toHaveBeenCalled();
      expect(t.children).toBeUndefined();
    });

    test('flat children', () => {
      const t = new MTemplate();
      t.initTag('div');
      t.addChildren([child]);
      t.endTag();
      t.flatChildren();
      expect(t.children).toBeUndefined();
      expect(t.strings.raw).toEqual(['<div><span></span></div>']);
    });

    test('flat children include value', () => {
      const t = new MTemplate();
      t.initTag('div');
      const child = new MTemplate();
      child.initTag('span');
      child.addProp('disabled', false);
      child.endTag();
      t.addChildren([child]);
      t.endTag();
      t.flatChildren();
      expect(t.children).toBeUndefined();
      expect(t.strings.raw).toEqual(['<div><span ?disabled="', '"></span></div>']);
      expect(t.values).toEqual([{ name: 'disabled', value: false }]);
    });



  });


});
