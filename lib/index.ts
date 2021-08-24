import { App } from 'vue';

import { default as WInput } from './base/input';
import { default as WButton } from './base/button';
import { default as WDialog } from './message/dialog';
import { default as WAdventureDialog } from './message/adventureDialog';
import { default as WTooltip } from './message/tooltip';
import { default as WScrollNumber } from './other/scrollNumber';
import { default as WSelect } from './base/select';
import { default as WDatePicker } from './base/datePicker';
import { default as WPopover } from './message/popover';
import { WMessage } from './message/message';
import { WPrinter } from "./other/printer";
import { WForm, WFormItem } from "./template/form";
import { default as WInputNumber } from './other/inputNumber';
import { default as WPagination } from './template/pagination';
import { default as WUpload } from './other/upload';
import { default as WDivider } from './other/divider';
import { default as WProcess } from './other/process';
import { default as WRadio } from './base/radio';
import { default as WCheckbox } from './base/checkbox';
import { default as WMenu } from './other/menu';
import { WTabs, WTabPane } from './template/tabs';
import { WTable, WTableColumn } from "./template/table";
import { default as WBorder } from './other/border';


import '../lib/style.scss'


const components = [
  WInput,
  WButton,
  WDialog,
  WTooltip,
  WScrollNumber,
  WSelect,
  WDatePicker,
  WPopover,
  WForm,
  WFormItem,
  WInputNumber,
  WPagination,
  WUpload,
  WDivider,
  WProcess,
  WAdventureDialog,
  WRadio,
  WCheckbox,
  WMenu,
  WTabs,
  WTabPane,
  WTable,
  WTableColumn,
  WBorder
]
const install = function (app: App) {
  components.forEach(component => {
    app.use(component);
  });
  return app;
};

export {
  WInput,
  WButton,
  WDialog,
  WTooltip,
  WScrollNumber,
  WSelect,
  WDatePicker,
  WPopover,
  WMessage,
  WForm,
  WFormItem,
  WInputNumber,
  WPagination,
  WUpload,
  WDivider,
  WProcess,
  WPrinter,
  WAdventureDialog,
  WRadio,
  WCheckbox,
  WMenu,
  WTabs,
  WTabPane,
  WTable,
  WTableColumn,
  WBorder
};

export const createWUI = () => {
  return {
    install
  }
}
