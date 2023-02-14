/**
 * @description shuimo li core hook
 * @author 阿怪
 * @date 2023/1/4 11:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { LiProps } from './li';
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import style from './li.pcss';
import useDefaultProps from '../../../../composition/useDefaultProps';


export const liProps: MCOPO<LiProps> = {
  active: { type: Boolean, default: false }
};

export function useLi() {
  const getTemplate = (options?: { props: LiProps }): MNodeTemplate => {
    const { props: _props } = options ?? {};
    const props = useDefaultProps(liProps, _props);
    return <li class={`m-li ${props.active ? 'm-li-active' : ''}`}>
      <slot/>
    </li>;
  };
  return { options: { props: liProps, style }, getTemplate };
}
