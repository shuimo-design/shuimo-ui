/**
 * @description core form hook
 * @author 阿怪
 * @date 2023/03/10 02:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import useDefaultOptions from '../../../composition/options/useDefaultOptions';
import { FormProps } from './form';

const style = await import('./form.pcss');
export const formProps: MCOPO<FormProps> = {
  inline: { type: Boolean, default: false },
  submit: { type: Boolean, default: false }
};

export function useForm() {

  const submitHook = (e: SubmitEvent, props: FormProps) => {
    if (!props.submit) {
      e.preventDefault();
    }
    return false;
  };

  const getTemplate = (options?: { props: FormProps }) => {
    const { props } = useDefaultOptions(options!, { props: formProps });
    return <form class={['m-form', props.inline ? 'm-form-inline' : undefined].join(' ')}
                 onSubmit={(e: SubmitEvent) => submitHook(e, props)}>
      <slot/>
    </form> as MNodeTemplate;
  };

  return {
    options: {
      props: formProps,
      style
    },
    getTemplate
  };
}
