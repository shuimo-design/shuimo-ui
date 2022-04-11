/**
 * @description button api
 * @author 阿怪
 * @date 2022/4/2 12:35 AM
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

import type { OptionType } from "./index";

export const props: OptionType['props'] = {
  text: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'primary' }
}



