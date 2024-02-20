/**
 * @description useTeleport test
 * @author 阿怪
 * @date 2023/5/9 01:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { h, Teleport, VNodeTypes } from 'vue';
import { describe, expect, test } from 'vitest';
import useTeleport, { initTeleportOptions } from '../../compositions/common/useTeleport.ts';


describe('useTeleport', () => {

  describe('default function', function () {
    const slot = h('div');


    test('will return a Teleport component include slot with default props', () => {
      const node = useTeleport({ slot });
      expect((node.type as VNodeTypes as typeof Teleport).__isTeleport).toBe(true);
      expect(node.props).toMatchObject({ to: 'body' });
      expect(node.children).toMatchObject([slot]);
    });

    test('teleportProps is true', () => {
      const node = useTeleport({ teleportProps: true, slot });
      expect(node.props).toMatchObject({ to: 'body' });
    });

    test('teleportProps is {to:"#home"}', () => {
      const node = useTeleport({ teleportProps: { to: '#home' }, slot });
      expect(node.props).toMatchObject({ to: '#home' });
    });

  });

  describe('initTeleportOptions function', function () {

    test('options is undefined', () => {
      expect(initTeleportOptions(undefined)).toMatchObject({ to: 'body' });
    });

    test('options is true', () => {
      expect(initTeleportOptions(true)).toMatchObject({ to: 'body' });
    });

    test('options is {to:"#home"}', () => {
      expect(initTeleportOptions({ to: '#home' })).toMatchObject({ to: '#home' });
    });

  });

});
