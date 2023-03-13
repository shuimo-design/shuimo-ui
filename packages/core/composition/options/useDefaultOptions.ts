/**
 * @description init options hook
 * @author 阿怪
 * @date 2023/2/18 17:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '@shuimo-design/types';
import useDefaultProps from '../useDefaultProps';


type Option<P, E> = {
  props: P;
  events?: E;
  ref?: Record<any, any>,
  slots?: any
}

export default function useDefaultOptions<P, E>(options: Option<P, E>, setting: Option<MCOPO<P>, E>) {

  const props = useDefaultProps<P>(setting.props, options.props);
  const events = options.events ?? (setting.events ?? {});
  const ref = options.ref ?? {};
  const slots = options.slots;

  return { props, events, ref, slots };

}
