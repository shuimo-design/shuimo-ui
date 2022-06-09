import { App, Component } from 'vue';

import MInput from './base/input/MInput';
import MInputNumber from './base/inputNumber/MInputNumber';
import MButton from './base/button/MButton';
import MSelect from './base/select/MSelect';
import MDatePicker from './base/datePicker/MDatePicker';
import MRadio from './base/radio/MRadio';
import MCheckbox from './base/checkbox/MCheckbox';
import MCheckboxGroup from './base/checkbox/MCheckboxGroup';
import MList from './base/list/MList';

import MConfirm from './message/confirm/MConfirm';
import MDialog from './message/dialog/MDialog';
import MDrawer from './message/drawer/MDrawer';
import { MMessageItem, MMessage } from './message/message/';

import MPopover from './message/popover/MPopover';
import MTooltip from './message/tooltip/MTooltip';

import MBorder from './other/border/MBorder';
import MDivider from './other/divider/MDivider';
import MMenu from './other/menu/MMenu';
import MPrinter from "./other/printer/Printer";
import MProgress from './other/progress/MProgress';
import MUpload from './other/upload/MUpload';

import MPagination from './template/pagination/MPagination';
import MFormItem from "./template/form/MFormItem";
import MForm from "./template/form/MForm";
import MTable from "./template/table/MTable";
import MTableColumn from "./template/table/MTableColumn";

import WScroll from './other/scroll';
import useDialog from './message/dialog/useDialog';

import '../lib/style.scss'


const components: Record<any, Component> = {
  MInput,
  MButton,
  MDialog,
  MTooltip,
  MSelect,
  MDatePicker,
  MPopover,
  MForm,
  MFormItem,
  MInputNumber,
  MPagination,
  MUpload,
  MDivider,
  MProgress,
  MRadio,
  MCheckbox,
  MMenu,
  MTable,
  MTableColumn,
  MBorder,
  MDrawer,
  MMessageItem,
  MCheckboxGroup,
  MList
}

const install = function (app: App) {
  Object.keys(components).forEach(key => {
    app.component(key, components[key]);
  });
  return app;
};

export {
  MInput,
  MButton,
  MDialog,
  MTooltip,
  MSelect,
  MDatePicker,
  MPopover,
  MForm,
  MFormItem,
  MInputNumber,
  MPagination,
  MUpload,
  MDivider,
  MProgress,
  MRadio,
  MCheckbox,
  MMenu,
  MTable,
  MTableColumn,
  MBorder,
  MDrawer,
  WScroll,
  MPrinter,
  MConfirm,
  MMessage,
  useDialog,
  MCheckboxGroup,
  MList
};

export const createWUI = () => {
  return {
    install
  }
}
