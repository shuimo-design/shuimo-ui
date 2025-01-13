/**
 * @description
 * @author 阿怪
 * @date 2024/11/29 10:15
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { HTMLElementEvent } from '../../types/template';
import { EmitsOptions, SetupContext, SlotsType } from '@vue/runtime-core';


export default function useInput<
  Props extends Record<string, any>,
  E extends EmitsOptions = {},
  EE extends string = string,
  S extends SlotsType = {}
// >(props: Props, ctx: SetupContext<E, S>) {
>(props: Props, ctx: any) {

  const isInput = props.type !== 'textarea';
  const inputType = isInput ? 'input' : 'textarea';
  const inputClass = isInput ? 'm-input-inner' : 'm-textarea-inner';
  const rowInfo = isInput ? {} : { rows: 10 };

  const baseProps = {
    autofocus: props.autofocus,
    value: props.modelValue,
    placeholder: props.placeholder,
    disabled: props.disabled,
    type: props.type,
    readOnly: props.readonly,
  }

  const onInput = (e: HTMLElementEvent<HTMLInputElement>)=>{
    ctx.emit('update:modelValue', e.target.value);
    ctx.emit('input', e.target.value);
  }

  const onFocus = (e: FocusEvent)=>{
    ctx.emit('focus', e);
  }

  const onBlur = (e: FocusEvent)=>{
    ctx.emit('blur', e);
  }

  return {
    baseProps,
    inputType,
    inputClass,
    rowInfo,
    onInput,
    onFocus,
    onBlur
  }

}
