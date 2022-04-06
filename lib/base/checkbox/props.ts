import { PropType } from 'vue';
import { WCheckboxProps } from './type';

export default {
  checked: {
    type: Boolean,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: undefined
  },
  label: {
    type: [String, Function] as PropType<WCheckboxProps['label']>
  },
  value: {
    type: [String, Number] as PropType<WCheckboxProps['value']>,
  },
  onChange: Function as PropType<WCheckboxProps['onChange']>,
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  defaultChecked: Boolean,
}