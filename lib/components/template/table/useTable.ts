/**
 * @description core table hook
 * @author 阿怪
 * @date 2023/03/11 13:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import Printer from '../../other/printer/Printer';


const error = Printer('水墨UI表格组件').error;

export function useTable() {

  type SlotRender = any | undefined;
  type StyleType = { width?: string } | undefined;
  const initTable = <T>(renders: {
    empty: T,
    tbodyTr: (option: {
      data: any | string,
      param: string,
      slot?: SlotRender,
      slotInfo?: { data: any, index: number }
    }) => T,
    theadTh: (option: {
      param?: string,
      label?: string,
      slot?: SlotRender,
      style?: StyleType
    }) => T,
    thead: (ths: T[]) => T,
    tbody: (trs: T[]) => T,
    tbodyTrs: (tds: T[], i: number) => T,
    initSlot: (tableColumn: any) => { body: SlotRender, head: SlotRender } | undefined,
  }, columns: Array<any>, data: any[]) => {
    const tbodyTrList: T[][] = [];
    data.forEach(d => {tbodyTrList.push([]);});


    const getData = (i: number, param: string) => {
      if (data[i] && data[i][param]) {
        return data[i][param];
      }
      return '';
    };

    const pushTd = (param: string | undefined, bodySlot: SlotRender, style: StyleType) => {
      if (param) {
        tbodyTrList.forEach((t, i) => {
          t.push(renders.tbodyTr({
            data: getData(i, param),
            param,
            slot: bodySlot,
            slotInfo: {
              data: data[i],
              index: i
            }
          }));
        });
      } else {
        error('param is undefined, column without param will be ignored!');
      }
      // todo if param is undefined
    };


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
     * init thead and push tbody rows to tbodyTrList
     */
    const initTHead = () => {
      const ths = (columns ?? []).filter(column => {
        if (!column.props) {
          error('column.props is undefined, column without param will be ignored!');
          return false;
        }
        return true;
      }).map((column, index) => {
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
          style
        });
      });
      return renders.thead(ths);
    };
    const thead = initTHead();
    const tbody = tbodyTrList.length > 0 ? renders.tbody(
      tbodyTrList.map((tds, i) => renders.tbodyTrs(tds, i))
    ) : renders.empty;

    return {
      thead,
      tbody
    };
  };


  return {
    initTable,
    error
  };

}
