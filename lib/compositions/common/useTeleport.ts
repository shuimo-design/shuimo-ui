/**
 * @description teleport hook
 * @author 阿怪
 * @date 2023/5/5 10:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { h, Teleport, TeleportProps, VNode } from 'vue';
import { MTeleportProps } from '../../types/common/common';

export default function useTeleport(options: {
  teleportProps?: MTeleportProps | true,
  slot: VNode | VNode[]
}) {
  return h(Teleport, initTeleportOptions(options.teleportProps as TeleportProps), options.slot);
}

export const initTeleportOptions = (options: TeleportProps | true | undefined ) => {
  if (options === true || options === undefined ) {
    return { to: 'body' };
  }
  return options;
};
