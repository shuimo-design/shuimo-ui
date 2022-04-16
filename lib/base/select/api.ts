/**
 * @description select api
 * @author 阿怪
 * @date 2022/4/16 21:10
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO } from "../../dependents/_types";
import { SelectProps } from "./index";

export const props: WCOPO<SelectProps> = {
  modelValue: { type: undefined, default: '' },
  options: { type: Array, default: () => [] },
  keyParam: { type: String, default: 'value' },
  titleParam: { type: String, default: 'title' },
  canChange: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '请选择...' }
}
