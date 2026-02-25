/**
 * @description headless list
 * @author 阿怪
 * @date 2025/02/25 00:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { ListCore } from '@shuimo-design/ui-core';
import { ListProps } from '@shuimo-design/ui-core/components/base/list/props';
import useList from '@shuimo-design/ui-core/components/base/list/useList';
import MLi from '../li/MLi.tsx';
import './list.css';

const { props } = ListCore;

export default defineComponent((_props: ListProps, { slots }) => {
  const props = _props as Required<ListProps>;

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
    </div>;
  };
}, {
  name: 'MList',
  props,
});
