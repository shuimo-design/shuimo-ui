/**
 * @description used to create powerful typescript support hook define
 * @author 阿怪
 * @date 2024/12/16 11:10
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ComponentObjectPropsOptions, ComponentOptions, EmitsOptions, SetupContext, SlotsType } from '@vue/runtime-core';


export const defineHook = <
  Props extends Record<string, any>,
  ReturnType extends Record<string, any> = {
    renderInit?: () => Record<string, any>;
  },
  E extends EmitsOptions = {},
  EE extends string = string,
  S extends SlotsType = {},
>(
  hook: ((props: Props, ctx: SetupContext<E, S>) => ReturnType),
  options?: Pick<ComponentOptions, 'name' | 'inheritAttrs'> & {
    props?: ComponentObjectPropsOptions<Props>;
    emits?: E | EE[];
    slots?: S;
  },
) => {
  return hook;
};
