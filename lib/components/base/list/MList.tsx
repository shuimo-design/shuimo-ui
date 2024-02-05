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
import { defineComponent } from 'vue';
import MLi from '../li/MLi.tsx';
import { useList } from './useList.ts';
import { props } from './api.ts';
import './list.css';

export default defineComponent((props, { slots }) => {
  return () => {

    const { baseRender, dataValidate } = useList();

    if (!dataValidate(props.data)) {
      return;
    }

    const data = props.data;

    return <div class="m-list">
      {
        data.map(d => {
          return <MLi active={(d.active ?? props.autoActive) as boolean}>
            {slots.default ? slots.default({ data: d }) : baseRender(d)}
          </MLi>;
        })
      }
    </div>
  };
}, {
  name: 'MList',
  props
});
