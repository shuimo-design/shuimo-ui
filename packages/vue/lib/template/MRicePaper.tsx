/**
 * @description 宣纸背景组件
 * @author 阿怪
 * @date 2022/7/14 23:22
 * @version v1.0.1
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 默认改为冷色调，添加色调选项
 */
import { defineComponent } from 'vue';
import { props } from '@shuimo-design/core/lib/template/ricePaper/api';

export default defineComponent({
  name: 'MRicePaper',
  props,
  setup(props, { slots }) {
    return () => {
      const mountainTemplate = props.mountain ? <div class="m-rice-paper-mountain"></div> : null;
      const craneTemplate = props.crane ? <div class="m-rice-paper-crane"></div> : null;

      return <div class={['m-rice-paper', { 'm-rice-paper-warm': !props.cold }]}>
        {mountainTemplate}
        {craneTemplate}
        <div class="m-rice-paper-main">
          {slots.default?.()}
        </div>
      </div>;
    };
  }
});
