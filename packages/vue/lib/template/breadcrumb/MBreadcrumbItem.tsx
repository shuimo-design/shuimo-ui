/**
 * @description vue version breadcrumbItem
 * @author youus
 * @date 2023/12/19 23:35
 * @version v1.0.0
 *
 * Hello, humor
 */
import { defineComponent, inject, VNode } from 'vue';
import { breadcrumbItemProps } from '@shuimo-design/core/lib/template/breadcrumb/api';

interface LocalMBreadcrumb {
  separator: string;
  theme: string;
  slots: {
    separator: () => VNode;
  };
  maxItemWidth: string;
}

export default defineComponent({
  name: 'MBreadcrumbItem',
  props: breadcrumbItemProps,
  setup: (props, { slots }) => {
    const localMBreadcrumb = inject<LocalMBreadcrumb>('mBreadcrumb');

    const separatorPropContent = localMBreadcrumb?.separator;
    const separatorSlot = localMBreadcrumb?.slots?.separator?.();

    const separatorContent = separatorPropContent || separatorSlot || (
      <div class='m-breadcrumb-separator' />
    );
    return () => {
      return (
        <div class="m-breadcrumb-item">
          <span class="m-breadcrumb-separator-wrapper">
            { separatorContent }
          </span>
          { slots.default?.() || props.content }
        </div>
      );
    };
  },
});
