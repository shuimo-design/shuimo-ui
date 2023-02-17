/**
 * @description set default props hook
 * @author 阿怪
 * @date 2023/2/8 17:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropOptions, MPropOptionsWithDefault } from '@shuimo-design/types';


export default function useDefaultProps<T>(option: MCOPO<T>, props?: T) {
  const obj: Record<keyof MCOPO<T>, any> = Object.create(null);
  Object.keys(option).forEach(k => {
    const key = k as keyof MCOPO<T>;
    const optionKey = option[key] as MPropOptionsWithDefault | MPropOptions;
    obj[key] = props?.[key] ?? optionKey.default;
  });
  return obj;
}
