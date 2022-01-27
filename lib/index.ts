import { App, Component } from 'vue';

import WInput from './base/input/WInput.vue';
import WButton from './base/button/WButton';
import WSelect from './base/select/WSelect';
import WDatePicker from './base/datePicker/WDatePicker';
import WRadio from './base/radio/WRadio.vue';
import WCheckbox from './base/checkbox/WCheckbox.vue';

import WAdventureDialog from './message/adventureDialog/WAdventureDialog';
import WConfirm from './message/confirm/WConfirm';
import WDialog from './message/dialog/WDialog';
import WDrawer from './message/drawer/WDrawer';
import WMessage from './message/message/Message';
import WPopover from './message/popover/WPopover.vue';
import WTooltip from './message/tooltip/WTooltip.vue';

import WBorder from './other/border/WBorder';
import WDivider from './other/divider/WDivider';
import WInputNumber from './other/inputNumber/WInputNumber';
import WMenu from './other/menu/WMenu';
import WPrinter from "./other/printer/Printer";
import WScrollNumber from './other/scrollNumber/WScrollNumber';
import WProgress from './other/progress/WProgress';
import WUpload from './other/upload/WUpload';

import WPagination from './template/pagination/WPagination';
import WFormItem from "./template/form/WFormItem.vue";
import WForm from "./template/form/WForm.vue";
import WTabPane from './template/tabs/WTabPane';
import WTabs from './template/tabs/WTabs';
import WTable from "./template/table/WTable";
import WTableColumn from "./template/table/WTableColumn";

import WScroll from './other/scroll';


import '../lib/style.scss'


const components: Record<any, Component> = {
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
  WProgress,
  WAdventureDialog,
  WRadio,
  WCheckbox,
  WMenu,
  WTabs,
  WTabPane,
  WTable,
  WTableColumn,
  WBorder,
  WDrawer,
  WConfirm
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
  WProgress,
  WPrinter,
  WAdventureDialog,
  WRadio,
  WCheckbox,
  WMenu,
  WTabs,
  WTabPane,
  WTable,
  WTableColumn,
  WBorder,
  WDrawer,
  WConfirm,
  WScroll
};

export const createWUI = () => {
  return {
    install
  }
}
