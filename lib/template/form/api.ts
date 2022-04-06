/**
 * @Description: form api
 * @Author: 阿怪
 * @Date: 2022/4/5 9:42 AM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import type { OptionType } from "./form";
import type { OptionType as ItemOptionType } from "./formItem";

export const props: OptionType['props'] = {
  inline: { type: Boolean, default: false },
  submit: { type: Boolean, default: false },
}

export const itemProps: ItemOptionType['props'] = {
  label: String,
  prop: String
}
