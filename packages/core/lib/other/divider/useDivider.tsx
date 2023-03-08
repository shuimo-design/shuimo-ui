/**
 * @description core divider hook
 * @author 阿怪
 * @date 2023/3/1 22:09
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import { DividerProps } from './index';
import useDefaultOptions from '../../../composition/options/useDefaultOptions';

const style = await import('./divider.pcss');
export const dividerProps: MCOPO<DividerProps> = {
  vertical: { type: Boolean, default: false }
};


export function useDivider() {

  const getTemplate = (options?: { props: DividerProps }) => {
    const { props } = useDefaultOptions(options!, { props: dividerProps });
    return <div class={['m-divider', props.vertical ? 'm-divider-vertical' : null].join(' ')}/> as MNodeTemplate;
  };

  return {
    options: {
      props: dividerProps,
      style
    },
    getTemplate
  };

}
