/**
 * @description core table hook
 * @author 阿怪
 * @date 2023/03/11 13:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { TableColumnProps } from '../tableColumn';


export function useTable() {

  const initTable = <T>(renders: {
    empty: T,
    tbodyTr: (data: any | string) => T,
    theadTh: (label?: string) => T,
    thead: (ths: T[]) => T,
    tbody: (trs: T[]) => T,
    tbodyTrs: (tds: T[], i: number) => T
  }, slots: Array<any>, data: any[]) => {
    const tbodyTrList: T[][] = [];
    data.forEach(d => {tbodyTrList.push([]);});

    const getData = (i: number, param: string) => {
      // todo support slot
      if (data[i] && data[i][param]) {
        return data[i][param];
      }
      return '';
    };

    const pushTd = (param?: string) => {
      if (param) {
        tbodyTrList.forEach((t, i) => {
          t.push(renders.tbodyTr(getData(i, param)));
        });
      }
      // todo if param is undefined
    };

    const initTHead = () => {
      const ths = slots.map((slot) => {
        pushTd(slot.props.param);
        return renders.theadTh(slot.props.label);
      });
      return renders.thead(ths);
    };
    const thead = initTHead();
    const tbody = tbodyTrList.length>0?renders.tbody(
      tbodyTrList.map((tds, i) => renders.tbodyTrs(tds, i))
    ): renders.empty;

    return {
      thead,
      tbody
    };
  };


  return {
    initTable
  };

}
