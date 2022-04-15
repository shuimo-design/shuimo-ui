import { CheckboxProps } from "./index";
import { WCOPO } from "../../dependents/_types";


export const props: WCOPO<CheckboxProps> = {
  checked: { type: Boolean, default: false },
  defaultChecked: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: '' },
  value: { type: String, default: '' },
  modelValue: { type: Boolean, default: false },
}
