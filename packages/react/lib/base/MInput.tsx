/**
 * @description react version MInput
 * @author 阿怪
 * @date 2023/2/13 02:19
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React, { HTMLAttributes } from 'react';
import '@shuimo-design/core/lib/base/input/input.css';
import { InputEvents, InputProps } from '@shuimo-design/core/lib/base/input';
import MBorder from '../template/MBorder';
import { HTMLElementEvent } from '@shuimo-design/types';

type OmittedInputAttributes = Omit<HTMLAttributes<HTMLInputElement>, keyof InputEvents | keyof InputProps>;
interface MInputProps extends OmittedInputAttributes, InputProps, InputEvents { }

export default function MInput(props: MInputProps) {
  const isInput = props.type !== 'textarea';
  const domType = isInput ? 'input' : 'textarea';
  const borderClass = [
    'm-input',
    !isInput ? 'm-textarea' : '',
    props.disabled ? 'm-input-disabled' : ''
  ].join(' ');

  const dom = React.createElement(domType, {
    ...props,
    value: props.value,
    placeholder: props.placeholder,
    disabled: props.disabled,
    readOnly: props.readonly,
    className: isInput ? 'm-input-inner' : 'm-textarea-inner',
    onInput: (e: HTMLElementEvent<HTMLInputElement>) => {
      if (props.disabled) { e.preventDefault(); }
      props.onInput?.(e);
    },
    onFocus: (e: FocusEvent) => {
      if (props.disabled) { e.preventDefault(); }
      props.onFocus?.(e);
    },
    onBlur: (e: FocusEvent) => {
      if (props.disabled) { e.preventDefault(); }
      props.onBlur?.(e);
    },
    ...(isInput ? {} : { rows: 10 })
  });

  return <MBorder className={borderClass}>
    {dom}
  </MBorder>;
}
