/**
 * @description list component
 * @author 阿怪
 * @date 2022/4/24 21:57
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo click toggle active and emit click event
 */
import { defineComponent, h } from 'vue';
import { props } from '@shuimo-design/core/lib/base/list/api';
import { useList } from '@shuimo-design/core/lib/base/list/useList';
import MLi from './MLi';


export default defineComponent({
  name: 'MList',
  props,
  setup: (props, { slots }) => {
    return () => {

      const { baseRender, dataValidate } = useList();

      if (!dataValidate(props.data)) {
        return;
      }

      const data = props.data;

      return <div class="m-list">
        {data.map(d => h(MLi, { active: d.active ?? props.autoActive }, {
          default: () => slots.default ? slots.default({ data: d }) : baseRender(d)
        }))}
      </div>;
    };
  }
});
