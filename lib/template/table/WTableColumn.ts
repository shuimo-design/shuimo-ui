/**
 * @description table column
 * @author 阿怪
 * @date 2021/8/23 11:38 上午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h } from 'vue'
import { tableColumnProps } from "./api";


export default defineComponent({
  name: 'WTableColumn',
  props: tableColumnProps,
  render(ctx: any) {
    return h('');
  }
})
