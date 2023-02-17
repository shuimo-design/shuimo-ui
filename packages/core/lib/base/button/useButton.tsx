/**
 * @description
 * @author 阿怪
 * @date 2022/12/12 14:51
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ButtonEvents, ButtonProps } from './index';
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import style from './button.pcss';


export const buttonProps: MCOPO<ButtonProps> = {
  text: { type: String, default: '' },
  link: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'default', enum: ['default', 'primary', 'error', 'confirm', 'warning'] }
};

export function useButton() {


  const template: MNodeTemplate = <button class="m-button">
    <slot/>
  </button>;

  const getDefaultProps = (props?: ButtonProps) => {
    return {
      text: props?.text ?? '',
      link: props?.link ?? false,
      disabled: props?.disabled ?? false,
      type: props?.type ?? 'default'
    };
  };

  const clickHandler = (e: MouseEvent, props: ButtonProps, event: ButtonEvents) => {
    if (props.disabled) {
      e.preventDefault();
    }
    event.onClick?.(e);
  };

  const getTemplate = (options?: {
    props?: ButtonProps,
    events?: ButtonEvents
  }): MNodeTemplate => {
    const { props: _props, events: _events } = options ?? {};
    const props = getDefaultProps(_props);
    const events = _events ?? {};
    return <button class={['m-button', `m-button-${props.type ?? 'default'}`].join(' ')}
                   disabled={props.disabled}
                   onClick={(e: MouseEvent) => clickHandler(e, props, events)}>
      <slot/>
    </button>;
  };

  return {
    options: { template, props: buttonProps, style },
    getTemplate
  };
}
