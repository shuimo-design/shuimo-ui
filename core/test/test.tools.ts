/**
 * @description test tools
 * @author 阿怪
 * @date 2025/1/14 09:56
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO } from '../components/types/props';

export const getPropsDefault = (props: MCOPO<any>) => {
  const defaultProps: Record<keyof typeof props, any> = {};
  for (const key in props) {
    defaultProps[key] = props[key].default;
  }
  return defaultProps;
};
