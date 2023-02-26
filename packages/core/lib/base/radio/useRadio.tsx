/**
 * @description core radio hook
 * @author 阿怪
 * @date 2023/2/26 13:43
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import { RadioEvents, RadioProps } from './index';
import style from './radio.pcss';
import useDefaultOptions from '../../../composition/options/useDefaultOptions';

export const radioProps: MCOPO<RadioProps> = {
  value: { type: [String, Number], default: '' },
  label: { type: [String, Number], default: '' }
};


export function useRadio() {

  const clickHandler = (e: MouseEvent, props: RadioProps, event: RadioEvents) => {
    // if (props.disabled) {
    //   e.preventDefault();
    // }
    event.onClick?.(e);
  };


  const getTemplate = (options?: { props: RadioProps, events: RadioEvents }) => {
    const { props, events } = useDefaultOptions(options!, { props: radioProps });
    return <label class="m-radio" >
      <input type="radio" class="m-radio-former" onClick={(e: MouseEvent) => clickHandler(e, props, events)}/>
      <div class={['m-radio-input', props.value === props.label ? 'selected' : ''].join(' ')}></div>
      <span class="m-radio-label">{options?.props.label}</span>
    </label> as MNodeTemplate;
  };


  return {
    options: { props: radioProps, style },
    getTemplate
  };
}
