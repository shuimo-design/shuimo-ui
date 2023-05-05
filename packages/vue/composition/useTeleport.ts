/**
 * @description teleport hook
 * @author 阿怪
 * @date 2023/5/5 10:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { h, Teleport, TeleportProps, VNode } from 'vue';

export default function useTeleport(options: {
  teleportProps: TeleportProps,
  slot: VNode
}) {
  return h(Teleport, options.teleportProps, options.slot);
}
