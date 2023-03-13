/**
 * @description core table hook
 * @author 阿怪
 * @date 2023/03/11 13:49
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import useDefaultOptions from '../../../composition/options/useDefaultOptions';
import { TableProps } from './index';
import useSlots from '../../../composition/useSlots';
import { TableColumnProps } from '../tableColumn';

const style = await import('./table.pcss');
export const tableProps: MCOPO<TableProps> = {
  data: { type: Array, default: () => [] },
  height: { type: String, default: null }
};

export function useTable() {

  const init = (slots: Array<{ props: TableColumnProps }>, data: any[]) => {
    const tbodyTrList: MNodeTemplate[][] = [];
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
          t.push(<td class="m-td">{getData(i, param)}</td>);
        });
      }
      // todo if param is undefined
    };

    const initTHead = () => {
      const ths = slots.map((slot) => {
        pushTd(slot.props.param);
        return <th class="m-th">{slot.props.label}</th>;
      });
      return <thead class="m-thead">
      <tr>{ths}</tr>
      </thead>;
    };
    const thead = initTHead();
    const tbody = <tbody class="m-tbody">
    {tbodyTrList.map(tds => {
      return <tr class="m-tr">
        {...tds}
        <td class="m-table-tbody-img"/>
      </tr>;
    })}
    </tbody>;

    return {
      thead,
      tbody
    };
  };

  const tableWrapper = (table: MNodeTemplate) => {
    return <div class="m-table">
      <div class="m-table-header-img-top"/>
      <div class="m-table-header-img-bottom"/>
      <div class="m-table-wrap">
        {table}
      </div>
      <div class="m-table-border-img-bottom"/>
    </div> as MNodeTemplate;
  };

  const getTemplate = (options?: { props: TableProps, slots?: any }) => {
    const { props, slots } = useDefaultOptions(options!, { props: tableProps });
    const { getSlots } = useSlots(slots);

    const { thead, tbody } = init(getSlots(), props.data);

    const table = <table class="m-table-inner">
      {thead}
      {tbody}
    </table>;

    return tableWrapper(table);
  };

  return {
    options: {
      props: tableProps,
      style
    },
    getTemplate
  };
}
