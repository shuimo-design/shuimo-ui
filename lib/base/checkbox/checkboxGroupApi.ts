import type { InjectionKey, Ref } from 'vue';

export const props = {
  modelValue: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
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