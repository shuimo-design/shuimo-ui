/**
 * @description
 * @author 阿怪
 * @date 2021/8/23 11:38 上午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h } from 'vue'


export default defineComponent({
  name: 'WTableColumn',
  props: {
    width: { type: String, default: '' },
    param: { type: String, default: '' },
    label: { type: String, default: '' }
  },
  render(ctx: any) {
    return h('');
  }
})
