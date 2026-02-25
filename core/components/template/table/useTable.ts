/**
 * @description core table hook
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


export function useTable() {

  // 使用 console.warn 替代 Printer 依赖
  const error = (msg: string) => console.warn(`[水墨UI表格组件] ${msg}`);

  type SlotRender = any | undefined;
  type StyleType = { width?: string } | undefined;

  const initTable = <T>(renders: {
    /** 数据为空时渲染的内容 */
    empty: T,
    /** 渲染单个 td 单元格 */
    tbodyTr: (option: {
      data: any | string,
      param: string,
      slot?: SlotRender,
      style?: StyleType,
      slotInfo?: { data: any, index: number }
    }) => T,
    /** 渲染单个 th 表头单元格 */
    theadTh: (option: {
      param?: string,
      label?: string,
      slot?: SlotRender,
      style?: StyleType
    }) => T,
    /** 渲染整个 thead */
    thead: (ths: T[]) => T,
    /** 渲染整个 tbody */
    tbody: (trs: T[]) => T,
    /** 渲染单行 tr */
    tbodyTrs: (tds: T[], i: number) => T,
    /** 从 tableColumn VNode 中提取 body/head 插槽 */
    initSlot: (tableColumn: any) => { body: SlotRender, head: SlotRender } | undefined,
  }, columns: Array<any>, data: any[]) => {
    // 每行对应的 td 列表，按行索引分组
    const tbodyTrList: T[][] = [];
    data.forEach(() => { tbodyTrList.push([]); });

    /** 从 data[i] 中安全取值 */
    const getData = (i: number, param: string) => {
      if (data[i] && data[i][param]) {
        return data[i][param];
      }
      return '';
    };

    /** 向每行的 td 列表中追加一列 */
    const pushTd = (param: string | undefined, bodySlot: SlotRender, style: StyleType) => {
      if (param) {
        tbodyTrList.forEach((t, i) => {
          t.push(renders.tbodyTr({
            data: getData(i, param),
            style,
            param,
            slot: bodySlot,
            slotInfo: {
              data: data[i],
              index: i,
            },
          }));
        });
      } else {
        error('param is undefined, column without param will be ignored!');
      }
    };

    /** 将列宽 prop 转换为 style 对象 */
    const getStyle = (options?: { width?: string | number }): StyleType => {
      if (!options || !options.width) {
        return {};
      }
      const numberWidth = Number(options.width);
      if (!isNaN(numberWidth)) {
        return { width: numberWidth + 'px' };
      }
      return { width: options.width as string };
    };

    /**
     * 初始化表头，同时将每列对应的 td 推入 tbodyTrList
     */
    const initTHead = () => {
      const ths = (columns ?? []).filter(column => {
        if (!column.props) {
          error('column.props is undefined, column without param will be ignored!');
          return false;
        }
        return true;
      }).map(column => {
        const slots = renders.initSlot(column);
        let bodySlot: SlotRender | undefined;
        let headSlot: SlotRender | undefined;
        const style = getStyle(column.props);
        if (slots) {
          bodySlot = slots.body;
          headSlot = slots.head;
        }
        pushTd(column.props.param, bodySlot, style);

        return renders.theadTh({
          label: column.props.label,
          param: column.props.param,
          slot: headSlot,
          style,
        });
      });
      return renders.thead(ths);
    };

    const thead = initTHead();
    const tbody = tbodyTrList.length > 0
      ? renders.tbody(tbodyTrList.map((tds, i) => renders.tbodyTrs(tds, i)))
      : renders.empty;

    return {
      thead,
      tbody,
    };
  };


  return {
    initTable,
    error,
  };

}
