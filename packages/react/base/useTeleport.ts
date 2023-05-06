/**
 * @description teleport hook
 * @author 阿怪
 * @date 2023/5/6 15:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * todo this is only a func struct, not a real teleport hook
 */
import { MTeleportProps } from '@shuimo-design/core/types/common/common';
import { ReactNode } from 'react';


export default function useTeleport(options: {
  teleportProps?: MTeleportProps | true,
  slot: ReactNode | ReactNode[]
}) {
  return options.slot;
}
