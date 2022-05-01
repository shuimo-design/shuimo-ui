import { App, Component } from 'vue';

import WInput from './base/input/WInput';
import WInputNumber from './base/inputNumber/WInputNumber';
import WButton from './base/button/WButton';
import WSelect from './base/select/WSelect';
import WDatePicker from './base/datePicker/WDatePicker';
import WRadio from './base/radio/WRadio';
import WCheckbox from './base/checkbox/WCheckbox';
import WCheckboxGroup from './base/checkbox/WCheckboxGroup';
import WList from './base/list/WList';

import WConfirm from './message/confirm/WConfirm';
import WDialog from './message/dialog/WDialog';
import WDrawer from './message/drawer/WDrawer';
import WMessage from './message/message/Message';
import WPopover from './message/popover/WPopover';
import WTooltip from './message/tooltip/WTooltip';

import WBorder from './other/border/WBorder';
import WDivider from './other/divider/WDivider';
import WMenu from './other/menu/WMenu';
import WPrinter from "./other/printer/Printer";
import WProgress from './other/progress/WProgress';
import WUpload from './other/upload/WUpload';

import WPagination from './template/pagination/WPagination';
import WFormItem from "./template/form/WFormItem";
import WForm from "./template/form/WForm";
import WTable from "./template/table/WTable";
import WTableColumn from "./template/table/WTableColumn";

import WScroll from './other/scroll';
import useDialog from './message/dialog/useDialog';

import '../lib/style.scss'


const components: Record<any, Component> = {
  WInput,
  WButton,
  WDialog,
  WTooltip,
  WSelect,
  WDatePicker,
  WPopover,
  WForm,
  WFormItem,
  WInputNumber,
  WPagination,
  WUpload,
  WDivider,
  WProgress,
  WRadio,
  WCheckbox,
  WMenu,
  WTable,
  WTableColumn,
  WBorder,
  WDrawer,
  WCheckboxGroup,
  WList
}

const install = function (app: App) {
  Object.keys(components).forEach(key => {
    app.component(key, components[key]);
  });
  return app;
};

export {
  WInput,
  WButton,
  WDialog,
  WTooltip,
  WSelect,
  WDatePicker,
  WPopover,
  WForm,
  WFormItem,
  WInputNumber,
  WPagination,
  WUpload,
  WDivider,
  WProgress,
  WRadio,
  WCheckbox,
  WMenu,
  WTable,
  WTableColumn,
  WBorder,
  WDrawer,
  WScroll,
  WPrinter,
  WConfirm,
  WMessage,
  useDialog,
  WCheckboxGroup,
  WList
};

export const createWUI = () => {
  return {
    install
  }
}
