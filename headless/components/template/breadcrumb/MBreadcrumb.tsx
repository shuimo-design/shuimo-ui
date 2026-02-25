/**
 * @description headless breadcrumb 面包屑组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构：
 *   nav.m-breadcrumb
 *     span.m-breadcrumb-item (无 href) | a.m-breadcrumb-item (有 href)
 *     span.m-breadcrumb-separator
 *     ...
 */
import { defineComponent } from 'vue';
import { BreadcrumbCore } from '@shuimo-design/ui-core';
const { props } = BreadcrumbCore;
import { BreadcrumbProps, BreadcrumbItemOption } from '@shuimo-design/ui-core/components/template/breadcrumb/props';
import './breadcrumb.css';

export default defineComponent((_props: BreadcrumbProps, _ctx: any) => {
  const { slots } = _ctx;

  return () => {
    const { separator, items } = _props as Required<BreadcrumbProps>;

    // 支持 default slot 完全覆盖内容
    if (slots.default) {
      return <nav class="m-breadcrumb">{slots.default()}</nav>;
    }

    // 根据 items 渲染面包屑列表
    const children: ReturnType<typeof renderItem>[] = [];

    items.forEach((item: BreadcrumbItemOption, index: number) => {
      // 支持 item slot 自定义单项渲染
      const itemContent = slots.item
        ? slots.item({ item, index })
        : renderItem(item);

      children.push(itemContent);

      // 末尾项不追加分隔符
      if (index < items.length - 1) {
        children.push(
          <span class="m-breadcrumb-separator" key={`sep-${index}`}>
            {separator}
          </span>,
        );
      }
    });

    return <nav class="m-breadcrumb">{children}</nav>;
  };

  /**
   * 渲染单个面包屑项
   * 有 href 且未禁用时渲染为 <a>，否则渲染为 <span>
   */
  function renderItem(item: BreadcrumbItemOption) {
    const classes = [
      'm-breadcrumb-item',
      item.disabled ? 'm-breadcrumb-item-disabled' : '',
    ].filter(Boolean);

    if (item.href && !item.disabled) {
      return (
        <a class={classes} href={item.href}>
          {item.label}
        </a>
      );
    }

    return (
      <span class={classes}>
        {item.label}
      </span>
    );
  }
}, {
  name: 'MBreadcrumb',
  props,
});
