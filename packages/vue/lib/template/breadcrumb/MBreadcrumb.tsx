/**
 * @description vue version breadcrumb
 * @author youus
 * @date 2023/12/19 23:25
 * @version v1.0.0
 *
 * Hello, humor
 */

import { defineComponent, reactive, provide, toRefs } from 'vue';
import { props } from '@shuimo-design/core/lib/template/breadcrumb/api';
import BreadcrumbItem from './MBreadcrumbItem';

export default defineComponent({
  name: 'MBreadcrumb',
  props,
  setup: (props, { slots }) => {
    const { separator } = toRefs(props);
    provide(
      'mBreadcrumb',
      reactive({
        separator,
        slots: { separator: slots.separator },
      }),
    );
    return () => {
      let content = slots.default?.()
      if (props.options && props.options.length) {
        content = props.options.map((option, index: number) => (
          <BreadcrumbItem {...option} key={index} />
        ));
      }
      return <div class="m-breadcrumb">{content}</div>;
    }
  }
});
