/**
 * @description core tag hook
 * @author 阿怪
 * @date 2023/3/1 01:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import { TagProps } from './index';
import useDefaultOptions from '../../../composition/options/useDefaultOptions';
import style from './tag.pcss';

export const tagProps: MCOPO<TagProps> = {
  type: { type: String, default: 'default' }
};

export function useTag() {


  const getTemplate = (options?: { props: TagProps }) => {
    const { props } = useDefaultOptions(options!, { props: tagProps });
    return <div class={['m-tag',`m-tag-${props.type}`].join(' ')}>
      <div class="m-tag-left"/>
      <div class="m-tag-main">
        <slot/>
      </div>
      <div class="m-tag-right"/>
    </div> as MNodeTemplate;
  };


  return {
    options: {
      props: tagProps,
      style
    },
    getTemplate
  };
}
