import type { OptionType } from './index';
import { PropType } from 'vue';
import { CheckboxProps } from './index';

export const props: OptionType['props'] = {
  checked: {
    type: Boolean,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: undefined
  },
  label: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  defaultChecked: {
    type: Boolean,
    default: false,
  },
  onChange: {
    type: Function as PropType<CheckboxProps['onChange']>,
    default: () => {},
  },
}