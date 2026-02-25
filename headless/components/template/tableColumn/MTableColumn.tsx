/**
 * @description headless tableColumn 标记组件，不渲染任何内容
 *              MTable 通过读取此组件的 props 和 slots 来构建表格列
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { TableColumnCore } from '@shuimo-design/ui-core/components/template/tableColumn';

const { props } = TableColumnCore;

export default defineComponent({ name: 'MTableColumn', props });
