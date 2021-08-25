/**
 * @Description: table组件
 * @Author: 菩萨蛮
 * @Date: 2021/8/23 11:30 上午
 * @Version v0.0.1-beta.1
 *
 * 一个极度简单的table组件
 * beta版 支持 slot width 设置
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 * v0.0.1-beta.1 添加slot检查提升健壮性
 */
import { defineComponent, h, VNode, VNodeNormalizedChildren } from 'vue'
import { notEmpty } from "../../dependents/_utils/tools";
import Printer from "../../other/printer/Printer";


const img = h('div', { class: 'w-table-tbody-img' });

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
  props: {
    data: { type: Array, default: () => [] }
  },
  render(ctx: any) {
    const theadThList: VNode[] = [];
    const tbodyTrList: VNode[] = [];

    if (!(ctx.$slots && ctx.$slots.default)) {
      Printer('水墨UI表格组件').error('列表必须传入slot');
      return null;
    }


    // 如果表格slot不为空
    if (notEmpty(ctx.$slots.default())) {
      const defaultSlot: any[] = ctx.$slots.default();
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
      ctx.data.forEach((d: any) => {
        tbodyTrList.push(dataTrRender(d, tableColumn));
      })

    }

    const { theadBorderTop, theadBorderBottom, tbodyBorderBottom } = borderRender();

    const thead = h('thead', { class: 'w-thead' }, wrapWithTr(theadThList));
    const tbody = h('tbody', { class: 'w-tbody' }, tbodyTrList);
    const table = h('table', { class: 'w-table' }, [thead, tbody]);

    return h('div', { class: 'w-table-wrap' }, [theadBorderTop, theadBorderBottom, table, tbodyBorderBottom]);
  }
})
