/**
 * @description Strings Class test
 * @author 阿怪
 * @date 2023/2/10 09:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test } from 'vitest';
import { createMStrings, MStrings } from '../../../lib/tools/MStrings';

describe('Strings', () => {
  test('init', () => {
    const s = createMStrings();
    expect(s).toBeInstanceOf(Array);
    expect(s.raw).toBeInstanceOf(Array);
    expect(s.raw).toEqual([]);
    expect(s.length).toBe(0);
  });

  test('constructor', () => {
    const s =  createMStrings(['a', 'b']);
    expect(s[0]).toBe('a');
    expect(s[1]).toBe('b');
    expect(s.raw).toEqual(['a', 'b']);
    expect(s.length).toBe(2);
  });

  test('add', () => {
    const s = createMStrings();
    expect(s.raw).toEqual([]);
    expect(s.length).toBe(0);
    s.add('a');
    expect(s[0]).toBe('a');
    expect(s.raw).toEqual(['a']);
    expect(s.length).toBe(1);
  });

  test('clear', () => {
    const s = createMStrings(['a', 'b']);
    expect(s.raw).toEqual(['a', 'b']);
    expect(s.length).toBe(2);
    s.clear();
    expect(s.raw).toEqual([]);
    expect(s.length).toBe(0);
  });

  test('addition', () => {
    const s = createMStrings(['a', 'b']);
    expect(s.raw).toEqual(['a', 'b']);
    expect(s.length).toBe(2);
    s.addition('c');
    expect(s.raw).toEqual(['a', 'bc']);
    expect(s.length).toBe(2);
  });

  test('insert', () => {
    const s = createMStrings(['a', 'b']);
    expect(s.raw).toEqual(['a', 'b']);
    expect(s.length).toBe(2);
    s.insert(1, createMStrings(['c']));
    expect(s.raw).toEqual(['ac', 'b']);
    expect(s.length).toBe(2);
  });

  test('remove', () => {
    const s = createMStrings(['a', 'b']);
    expect(s.raw).toEqual(['a', 'b']);
    expect(s.length).toBe(2);
    console.log(s.raw);
    s.remove(1);
    expect(s.raw).toEqual(['a']);
    expect(s.length).toBe(1);
  });

  test('modify', () => {
    const s = createMStrings(['a', 'b']);
    expect(s.raw).toEqual(['a', 'b']);
    expect(s.length).toBe(2);
    s.modify(1,'c');
    expect(s.raw).toEqual(['a', 'c']);
    expect(s.length).toBe(2);
  });

});
