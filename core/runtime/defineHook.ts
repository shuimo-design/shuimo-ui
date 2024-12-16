/**
 * @description used to create powerful typescript support hook define
 * @author 阿怪
 * @date 2024/12/16 11:10
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { EmitsOptions, SetupContext, SlotsType } from '@vue/runtime-core';
import { UseHookResult } from '../components/types/hook';


export const defineHook = <
  Props extends Record<string, any>,
  E extends EmitsOptions = {},
  S extends SlotsType = {},
  Return = any
>(hook: (props: Props, ctx: SetupContext<E, S>) => Return):
  (props: Props, ctx: SetupContext<E, S>) => UseHookResult<Props, S, Return> => {
    return hook;
}
