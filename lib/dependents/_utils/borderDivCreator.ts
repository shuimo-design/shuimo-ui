/**
 * @description 一个用于建立边框的小方法
 * @author 阿怪
 * @date 2021/7/26 11:17 上午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

import { h } from 'vue'

export const borderDivCreator = (typeName: string) => {
  const positionEnum = ['top', 'right', 'bottom', 'left'];
  return positionEnum.map(p => h('div', { class: [`${typeName}-line`, `${typeName}-${p}-line`] }));
}
