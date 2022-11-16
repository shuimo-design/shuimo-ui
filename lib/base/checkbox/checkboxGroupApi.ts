import type { InjectionKey, Ref } from 'vue';
import { CheckboxGroupProps } from './checkboxGroup';
import { WCOPO } from '../../dependents/_types';

export const props: WCOPO<CheckboxGroupProps> = {
  modelValue: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false }
};

export type CheckboxGroupContext = {
  cancelValue: (id: symbol) => void,
  registerValue: (id: symbol, value: string) => void,
  checkHandle: (label: string, value: string, id?: symbol) => void,
  disabled: Ref<boolean>,
  groupValue: Ref<any[]>
};

export const CheckboxGroupContextKey: InjectionKey<CheckboxGroupContext> = Symbol('CheckboxGroupContext');
