/**
 * @description core formItem hook
 * @author 阿怪
 * @date 2023/03/10 02:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * todo fix for or HTMLFor
 */
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import useDefaultOptions from '../../../composition/options/useDefaultOptions';
import { FormItemProps } from './formItem';

const style = await import('./formItem.pcss');
export const formItemProps: MCOPO<FormItemProps> = {
  label: { type: String, default: '' },
  prop: { type: String, default: '' }
};

export function useFormItem() {

  const getTemplate = (options?: { props: FormItemProps }) => {
    const { props } = useDefaultOptions(options!, { props: formItemProps });
    return <div class="m-form-item">
      <label for={props.prop} class="m-form-item-label">
        {props.label ? props.label : <slot name="label"/>}
      </label>
      <div class="m-form-item-content">
        <slot/>
      </div>
    </div> as MNodeTemplate;
  };

  return {
    options: {
      props: formItemProps,
      style
    },
    getTemplate
  };
}
