/**
 * @description 宣纸背景组件
 * @author 阿怪
 * @date 2022/7/14 23:22
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h } from "vue";
import Printer from "../../other/printer/Printer";
import { props } from "./api";


export default defineComponent({
  name: 'MRicePaper',
  props,
  setup: (props, { slots }) => {

    if (!slots || !slots.default) {
      Printer('水墨宣纸组件').error('必须传入default slot');
      return () => null;
    }

    const mountain = props.mountain ? (<div class="m-rice-paper-mountain"></div>) : undefined;
    const crane = props.crane ? (<div class="m-rice-paper-crane"></div>) : undefined;

    return () => (
      <div class="m-rice-paper">
        {mountain}
        {crane}
        <div class="m-rice-paper-main">
          {slots.default!()}
        </div>
      </div>
    )
  }
})
