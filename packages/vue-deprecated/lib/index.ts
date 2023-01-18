import { App, Component } from 'vue';

import MInput from './base/input/MInput';
import MInputNumber from './base/inputNumber/MInputNumber';
import MSelect from './base/select/MSelect';
import MDatePicker from './base/datePicker/MDatePicker';
import MRadio from './base/radio/MRadio';
import MCheckbox from './base/checkbox/MCheckbox';
import MCheckboxGroup from './base/checkbox/MCheckboxGroup';
import MList from './base/list/MList';
import MTag from './base/tag/MTag';
import MSwitch from './base/switch/MSwitch';

import MConfirm from './message/confirm/MConfirm';
import MDialog from './message/dialog/MDialog';
import MDrawer from './message/drawer/MDrawer';
import { MMessageItem, MMessage } from './message/message';

import MPopover from './message/popover/MPopover';
import MTooltip from './message/tooltip/MTooltip';

import MBorder from './other/border/MBorder';
import MDivider from './other/divider/MDivider';
import MLoading from './other/loading/MLoading';
import MMenu from './other/menu/MMenu';
import MPrinter from './other/printer/Printer';
import MProgress from './other/progress/MProgress';
import MUpload from './other/upload/MUpload';

import MPagination from './template/pagination/MPagination';
import MFormItem from './template/form/MFormItem';
import MForm from './template/form/MForm';
import MTable from './template/table/MTable';
import MTableColumn from './template/table/MTableColumn';
import MRicePaper from './template/ricePaper/MRicePaper';

import MDeleteIcon from './other/icons/deleteIcon/MDeleteIcon';

import useDialog from './message/dialog/useDialog';

import './style.scss';
import { loadingDirective } from './other/loading/directive';

const components: Record<any, Component> = {
  MInput,
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
  MLoading,
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
  MList,
  MRicePaper,
  MTag,
  MSwitch,
  MDeleteIcon
};

export {
  MInput,
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
  MLoading,
  MProgress,
  MRadio,
  MCheckbox,
  MMenu,
  MTable,
  MTableColumn,
  MBorder,
  MDrawer,
  MPrinter,
  MConfirm,
  MMessage,
  useDialog,
  MCheckboxGroup,
  MList,
  MRicePaper,
  MTag,
  MSwitch,
  MDeleteIcon
};

export function createMUI() {
  return {
    install: (app: App) => {
      Object.keys(components).forEach(key => {
        app.component(key, components[key]);
      });
      app.directive('loading', loadingDirective);
      return app;
    }
  };
}
