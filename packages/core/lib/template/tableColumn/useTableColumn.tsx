/**
 * @description core tableColumn hook
 * @author 阿怪
 * @date 2023/03/11 13:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * todo ...think about this
 */
import { MCOPO, MNodeTemplate } from '@shuimo-design/types';
import useDefaultOptions from '../../../composition/options/useDefaultOptions';
import { TableColumnProps } from './index';

const style = await import('./tableColumn.pcss');
export const tableColumnProps: MCOPO<TableColumnProps> = {
  width: { type: String, default: '' },
  param: { type: String, default: '' },
  label: { type: String, default: '' }
};

export function useTableColumn() {

  const getTemplate = (options?: { props: TableColumnProps }) => {
    const {} = useDefaultOptions(options!, { props: tableColumnProps });
    return <div/> as MNodeTemplate;
  };

  return {
    options: {
      props: tableColumnProps,
      style
    },
    getTemplate
  };
}
