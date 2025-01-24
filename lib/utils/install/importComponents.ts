/**
 * @description
 * @author 阿怪
 * @date 2024/2/3 19:38
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Component } from 'vue';

import useDialog from '../../compositions/useDialog';
import useDarkModeStorage from '../../compositions/useDarkModeStorage';
// [base]
import MAvatar from '../../components/base/avatar/MAvatar';
import MButton from '../../components/base/button/MButton';
import MCheckbox from '../../components/base/checkbox/MCheckbox';
import MCheckboxGroup from '../../components/base/checkbox/MCheckboxGroup';
import MDatePicker from '../../components/base/datePicker/MDatePicker';
import MInput from '../../components/base/input/MInput';
import MInputNumber from '../../components/base/inputNumber/MInputNumber';
import MLi from '../../components/base/li/MLi';
import MList from '../../components/base/list/MList';
import MProgress from '../../components/base/progress/MProgress';
import MRadio from '../../components/base/radio/MRadio';
import MRadioGroup from '../../components/base/radio/MRadioGroup.tsx';
import MSelect from '../../components/base/select/MSelect';
import MSlider from '../../components/base/slider/MSlider';
import MSwitch from '../../components/base/switch/MSwitch';
import MTag from '../../components/base/tag/MTag';
import MTree from '../../components/base/tree/MTree';
import MTreeNode from '../../components/base/tree/MTreeNode';

// [other]
import MDivider from '../../components/other/divider/MDivider';
import MLoading from '../../components/other/loading/MLoading';
import { loadingDirective } from '../../components/other/loading/directive';
import MDarkMode from '../../components/other/darkMode/MDarkMode';
import MDeleteIcon from '../../components/other/deleteIcon/MDeleteIcon';
import MPrinter from '../../components/other/printer/Printer';
import MSvgWrapper from '../../components/other/svg/MSvgWrapper';
import MScroll from '../../components/other/scroll/MScroll.tsx';

// [message]
import MConfirm from '../../components/message/confirm/MConfirm';
import MDialog from '../../components/message/dialog/MDialog';
import MDrawer from '../../components/message/drawer/MDrawer';
import MMessage from '../../components/message/message/MMessage';
import MPopover from '../../components/message/popover/MPopover';
import MTooltip from '../../components/message/tooltip/MTooltip';

// [template]
import MBorder from '../../components/template/border/MBorder';
import MBreadcrumb from '../../components/template/breadcrumb/MBreadcrumb';
import MBreadcrumbItem from '../../components/template/breadcrumb/MBreadcrumbItem';
import MRicePaper from '../../components/template/ricePaper/MRicePaper';
import MCell from '../../components/template/cell/MCell';
import MGrid from '../../components/template/grid/MGrid';
import MForm from '../../components/template/form/MForm';
import MFormItem from '../../components/template/form/MFormItem';
import MMenu from '../../components/template/menu/MMenu';
import MPagination from '../../components/template/pagination/MPagination';
import MTable from '../../components/template/table/MTable';
import MTableColumn from '../../components/template/tableColumn/MTableColumn';
import MVirtualList from '../../components/template/virtualList/MVirtualList';

export const components: Record<string, Component> = {
  // [base]
  MAvatar,
  MButton,
  MCheckbox,
  MCheckboxGroup,
  MDatePicker,
  MInput,
  MInputNumber,
  MLi,
  MList,
  MProgress,
  MRadio,
  MRadioGroup,
  MSelect,
  MSlider,
  MSwitch,
  MTag,
  MTree,
  MTreeNode,

  // [other]
  MDivider,
  MLoading,
  MDarkMode,
  MDeleteIcon,
  MSvgWrapper,

  // [message]
  MDialog,
  MDrawer,
  MPopover,
  MTooltip,

  // [template]
  MBorder,
  MBreadcrumb,
  MBreadcrumbItem,
  MRicePaper,
  MCell,
  MGrid,
  MForm,
  MFormItem,
  MMenu,
  MPagination,
  MTable,
  MTableColumn,
  MVirtualList,
};

export {
  useDialog,
  useDarkModeStorage,

  loadingDirective,

  // [base]
  MAvatar,
  MButton,
  MCheckbox,
  MCheckboxGroup,
  MDatePicker,
  MInput,
  MInputNumber,
  MLi,
  MList,
  MProgress,
  MRadio,
  MRadioGroup,
  MSelect,
  MSlider,
  MSwitch,
  MTag,
  MTree,
  MTreeNode,

  // [other]
  MDivider,
  MLoading,
  MDarkMode,
  MDeleteIcon,
  MPrinter,
  MSvgWrapper,
  MScroll,

  // [message]
  MConfirm,
  MDialog,
  MDrawer,
  MMessage,
  MPopover,
  MTooltip,

  // [template]
  MRicePaper,
  MBorder,
  MBreadcrumb,
  MBreadcrumbItem,
  MCell,
  MGrid,
  MForm,
  MFormItem,
  MMenu,
  MPagination,
  MTable,
  MTableColumn,
  MVirtualList,

};

export { MShuimoConfigKey } from '../../components/other/config/MShuimoConfig';
