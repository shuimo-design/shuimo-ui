/**
 * @Description:
 * @Author: 菩萨蛮
 * @Date: 2021/8/23 11:30 上午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { withInstall } from "../../dependents/_utils/install";
import Table from './WTable';
import TableColumn from './WTableColumn';

export const WTable = withInstall(Table);
export const WTableColumn = withInstall(TableColumn);
