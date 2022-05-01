import type { InjectionKey, Ref } from 'vue';
import { CheckboxGroupProps } from "./checkboxGroup";
import { WCOPO } from "../../dependents/_types";

export const props:WCOPO<CheckboxGroupProps> = {
  modelValue: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false },
}

export type CheckboxGroupContext = {
  cancelValue: (id: Symbol) => void;
  registerValue: (id: Symbol, value: string) => void;
  checkHandle: (label: string, value: string, id?: Symbol,) => void;
  disabled: Ref<boolean>;
  groupValue: Ref<any[]>;
};

export const CheckboxGroupContextKey: InjectionKey<CheckboxGroupContext> =
  Symbol('CheckboxGroupContext');
