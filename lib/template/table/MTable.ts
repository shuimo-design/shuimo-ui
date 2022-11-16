/**
 * @description table组件
 * @author 阿怪
 * @date 2021/8/23 11:30 上午
 * @version v0.0.4
 *
 * 一个极度简单的table组件
 * beta版 支持 slot width 设置
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v0.0.1-beta.1 添加slot检查提升健壮性
 * v0.0.1-beta.2 新增header fixed功能
 * v0.0.2 header样式根据height变换
 * v0.0.3 添加无数据提示和empty插槽
 * v0.0.4 添加index参数、添加两个异常提醒，添加v-for支持
 */
import { defineComponent, Fragment, Comment, h, VNode } from 'vue';
import { isEmpty, notEmpty } from '../../dependents/_utils/tools';
import Printer from '../../other/printer/Printer';
import { props } from './api';
import MTableColumn from './MTableColumn';

const img = h('td', { class: 'm-table-tbody-img' });

/**
 * 使用tr包裹
 * @param tList td或者th列表
 */
const wrapWithTr = (tList: VNode[]) => {
  return h('tr', { class: 'm-tr' }, tList);
};

const dataTrRender = (data: any, index: number, tableColumn: columnType[]) => {
  const trList: VNode[] = [];
  tableColumn.forEach(col => {
    if (col.children) {
      const defaultSlot = col.children.default({ data, index });
      trList.push(h('td', { class: 'm-td' }, defaultSlot));
    } else {
      trList.push(h('td', { class: 'm-td' }, data[col.key]));
    }
  });
  trList.push(img);
  return wrapWithTr(trList);
};

const borderRender = () => {
  const theadBorderTop = h('div', { class: 'm-table-header-img-top' }, []);
  const theadBorderBottom = h('div', { class: 'm-table-header-img-bottom' }, []);
  const tbodyBorderBottom = h('div', { class: 'm-table-border-img-bottom' }, []);

  return { theadBorderTop, theadBorderBottom, tbodyBorderBottom };
};

type columnType = {
  key: string,
  children: any // VNodeNormalizedChildren  大概率是个RawSlots
};
const error = Printer('水墨UI表格组件').error;

export default defineComponent({
  name: 'MTable',
  props,
  setup(props, { slots }) {
    return () => {
      const theadThList: VNode[] = [];
      const tbodyTrList: VNode[] = [];

      if (!(slots && slots.default)) {
        error('列表必须传入一个默认的m-table-column');
        return null;
      }

      const emptySlot = slots && slots.empty ? slots.empty() : h('div', { class: 'm-table-empty' }, '暂无数据');

      // 如果表格slot不为空
      if (notEmpty(slots.default())) {
        const defaultSlot: any[] = slots.default();
        const tableColumn: columnType[] = [];

        const initByTableColumn = (info: { param: string; label: string; width?: number | string }, children: any) => {
          const { param, label, width } = info;
          tableColumn.push({
            key: param,
            children
          });
          // 构造thead
          theadThList.push(h('th', { class: 'm-th', width }, label));
        };

        // 遍历column
        defaultSlot.forEach(s => {
          // 如果是Fragment类型，那大概率是v-for生成的，其他场景暂时无法判断
          if (s.type === Fragment) {
            s.children.forEach((c: typeof MTableColumn) => {
              initByTableColumn(c.props, c.children);
            });
            return;
          }
          if (s.type === Comment && s.type.name === undefined) {
            return;
          }
          if (s.type.name !== 'MTableColumn') {
            error(`传入子节点：${s.type.name}，列表子节点必须传入m-table-column，否则将会被过滤。`);
            return;
          }
          if (isEmpty(s.props)) {
            error('m-table-column必须传入props属性');
            return;
          }
          initByTableColumn(s.props, s.children);
        });

        props.data.forEach((d: any, i) => {
          tbodyTrList.push(dataTrRender(d, i, tableColumn));
        });
      }

      const { theadBorderTop, theadBorderBottom, tbodyBorderBottom } = borderRender();

      const thead = h(
        'thead',
        {
          class: ['m-thead', { 'm-thead-overflow': props.height }]
        },
        wrapWithTr(theadThList)
      );
      const tbody = h('tbody', { class: 'm-tbody' }, tbodyTrList);
      const table = h('table', { class: 'm-table-inner' }, [thead, tbody]);
      const tableWrap = h('div', { class: 'm-table-wrap', style: { height: props.height } }, [
        table,
        notEmpty(props.data) ? undefined : emptySlot
      ]);

      return h('div', { class: 'm-table' }, [theadBorderTop, theadBorderBottom, tableWrap, tbodyBorderBottom]);
    };
  }
});
