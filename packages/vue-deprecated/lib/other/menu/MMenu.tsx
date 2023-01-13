/**
 * @description 菜单组件
 * @author 阿怪
 * @date 2021/7/19 2:46 下午
 * @version v1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v1.0.1 menu添加默认选中key相同的子目录的功能 阿怪
 * todo 背景图
 */
import { h, defineComponent, VNode } from 'vue';
import { MenuTypeArr } from '../../../types/components/components';
import { props } from './api';

const setMenuIndex = (menu: MenuTypeArr) => {
  menu.forEach((m, i) => {
    m.index = [i];
    m.children?.forEach((cm, j) => {
      cm.index = [i, j];
    });
  });
};

export default defineComponent({
  name: 'MMenu',
  props,
  emits: ['click'],
  render(ctx: any) {
    const propsMenu: MenuTypeArr = ctx.$props.menu;
    setMenuIndex(propsMenu);
    // 左边的灰色条
    const leftLine = h('div', { class: 'm-menu-left-line' });

    const divClick = (index: number[]) => {
      if (index.length === 1) {
        propsMenu.forEach(m => {
          m.isActive = m.index === index;
          m.children?.forEach(cm => {
            cm.isActive = cm.key === m.key;
          });
        });
      } else {
        const pIndex = [index[0]];
        propsMenu.forEach(m => {
          m.isActive = m.index![0] === pIndex[0];
          m.children?.forEach(cm => {
            cm.isActive = cm.index === index;
          });
        });
      }
      this.$emit('click', index);
    };

    /**
     * 二级菜单列表
     * @param list
     */
    const initChildItems: (list: MenuTypeArr) => VNode = list => {
      const items = list.map(menu => {
        const titleSpan = h('span', { class: 'm-cursor-pointer' }, menu.title);
        return h('div', {
          class: ['m-menu-item-child', menu.isActive ? 'active' : ''],
          onClick: (event: Event) => {
            event.stopPropagation();
            divClick(menu.index!);
          }
        }, [
          titleSpan
        ])
      });
      return h('div', { class: ['m-menu-item-children'] }, items);
    };

    const itemList = propsMenu.map(menu => {
      const titleSpan = h('span', { class: 'm-cursor-pointer' }, menu.title);
      // 先只有二级吧
      const childItems = menu.children && menu.isActive ? initChildItems(menu.children) : [];
      const icon = h('div', { class: 'm-menu-item-icon' });
      return h('div',
        {
          class: ['m-menu-item', menu.isActive ? 'active' : ''],
          onClick: (event: Event) => {
            event.stopPropagation();
            divClick(menu.index!);
          }
        },
        [icon, titleSpan, childItems]
      );
    });

    const MMenuItems = h('div', { class: ['m-menu-items'] }, itemList);

    return h('div', { class: 'm-menu' }, [leftLine, MMenuItems]);
  }
});
