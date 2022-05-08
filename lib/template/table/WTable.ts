/**
 * @description table组件
 * @author 阿怪
 * @date 2021/8/23 11:30 上午
 * @version v0.0.2
 *
 * 一个极度简单的table组件
 * beta版 支持 slot width 设置
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v0.0.1-beta.1 添加slot检查提升健壮性
 * v0.0.1-beta.2 新增header fixed功能
 * v0.0.2 header样式根据height变换
 */
import { defineComponent, h, VNode } from 'vue'
import { notEmpty } from "../../dependents/_utils/tools";
import Printer from "../../other/printer/Printer";
import { props } from "./api";


const img = h('td', { class: 'w-table-tbody-img' });

/**
 * 使用tr包裹
 * @param tList td或者th列表
 */
const wrapWithTr = (tList: VNode[]) => {
  return h('tr', { class: 'w-tr' }, tList);
}

const dataTrRender = (data: any, tableColumn: columnType[]) => {
  const trList: VNode[] = [];
  tableColumn.forEach(col => {

    if (col.children) {
      const defaultSlot = col.children.default({ data });
      trList.push(h('td', { class: 'w-td' }, defaultSlot));
    } else {
      trList.push(h('td', { class: 'w-td' }, data[col.key]));
    }


  });
  trList.push(img);
  return wrapWithTr(trList);
}

const borderRender = () => {
  const theadBorderTop = h('div', { class: 'w-table-header-img-top' }, []);
  const theadBorderBottom = h('div', { class: 'w-table-header-img-bottom' }, []);
  const tbodyBorderBottom = h('div', { class: 'w-table-border-img-bottom' }, []);

  return { theadBorderTop, theadBorderBottom, tbodyBorderBottom };
}

type columnType = {
  key: string,
  children: any   // VNodeNormalizedChildren  大概率是个RawSlots
}

export default defineComponent({
  name: 'WTable',
  props,
  setup(props, { slots }) {
    return () => {
      const theadThList: VNode[] = [];
      const tbodyTrList: VNode[] = [];

      if (!(slots && slots.default)) {
        Printer('水墨UI表格组件').error('列表必须传入slot');
        return null;
      }


      // 如果表格slot不为空
      if (notEmpty(slots.default())) {
        const defaultSlot: any[] = slots.default();
        const tableColumn: columnType[] = [];

        // 遍历column
        defaultSlot.forEach(s => {
          const { param, label, width } = s.props;
          tableColumn.push({
            key: param,
            children: s.children
          });
          // 构造thead
          theadThList.push(h('th', { class: 'w-th', width }, label));
        })
        props.data.forEach((d: any) => {
          tbodyTrList.push(dataTrRender(d, tableColumn));
        })

      }

      const { theadBorderTop, theadBorderBottom, tbodyBorderBottom } = borderRender();

      const thead = h('thead', {
        class: ['w-thead', { 'w-thead-overflow': props.height }]
      }, wrapWithTr(theadThList));
      const tbody = h('tbody', { class: 'w-tbody' }, tbodyTrList);
      const table = h('table', { class: 'w-table-inner' }, [thead, tbody]);
      const tableWrap = h('div', { class: 'w-table-wrap', style: { height: props.height } }, table);

      return h('div', { class: 'w-table' }, [theadBorderTop, theadBorderBottom, tableWrap, tbodyBorderBottom]);
    }
  },
})
