/**
 * @description MMenuItem component
 * @author 阿怪
 * @date 2023/8/3 16:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { defineComponent, h, resolveComponent } from 'vue';
import { treeNodeProps } from '@shuimo-design/core/lib/base/tree/api';

export default defineComponent({
  name: 'MMenuItem',
  props: treeNodeProps,
  inheritAttrs: false,
  setup: (props) => {

    const MMenuItem = resolveComponent('MMenuItem');
    return () => {
      const { label: l, key: k, children: c } = props.config;

      return <>{
        props.data.map((d) => {
          const children = d[c] ?? [];
          const cKeys = children.map((it) => it[k]);
          const childNodes = props.getNodesByKeys(cKeys);
          return <div class={['m-menu-item', { 'm-menu-item-active': d.isActive }]}
                      onClick={(e: MouseEvent) => props.handleItemClick(d, e)}>
            <div class="m-menu-item-icon"/>
            <span class="m-cursor-pointer">{d[l]}</span>
            {(childNodes.length > 0 && d.expand) ? <div class="m-menu-item-child">
              {h(MMenuItem, { ...props, data: childNodes })}
            </div> : null}

          </div>;
        })
      }</>;
    };

  }
});
