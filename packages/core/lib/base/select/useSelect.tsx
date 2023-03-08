/**
 * @description core select hook
 * @author 阿怪
 * @date 2023/1/29 04:16
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MPropType } from '@shuimo-design/types';
import { SelectProps } from './index';
import { useBorder, usePopover } from '../../../index';
import useDefaultOptions from '../../../composition/options/useDefaultOptions';
import { RefRecord } from '../../../types/common/hook';

const style = await import('./select.pcss');

export const selectProps: MCOPO<SelectProps> = {
  modelValue: { type: undefined, default: '' },
  options: { type: Array, default: () => [] },
  inputParam: { type: String, default: undefined },
  optionParam: { type: String, default: undefined },
  valueParam: { type: String, default: undefined },
  readonly: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '请选择...' },
  toMatch: { type: Function as MPropType<(option: any, value: any) => boolean>, default: undefined },
  multiple: { type: Boolean, default: false },
  checkbox: { type: Boolean, default: true },
  filter: { type: Function as MPropType<(option: any, inputValue: string) => boolean>, default: undefined }
};

export function useSelect() {
  const { options: { style: borderStyle } } = useBorder();
  const { options: { style: popoverStyle } } = usePopover();

  const getTemplate = (options?: {
    props: SelectProps,
    ref: RefRecord
  }) => {
    const { props } = useDefaultOptions(options!, { props: selectProps });

    const readonlyDiv = useBorder(<div class="m-select">
      {}
    </div>);
    const trigger = props.readonly ? readonlyDiv.getTemplate() : <input></input>;


    const getContent = () => {
      if (props.options && props.options.length > 0) {

      }
      return <div class="m-select-options">
        <slot/>
      </div>;
    };

    const content = useBorder(getContent());

    const select = usePopover({ trigger, content: content.getTemplate() });


    const res = select.getTemplate({ ref: options!.ref });
    return res;

  };


  return {
    options: { props: selectProps, style: style + borderStyle + popoverStyle },
    getTemplate
  };
}
