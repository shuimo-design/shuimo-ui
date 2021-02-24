import { App } from 'vue';

import { default as WInput } from './input';
import { default as WButton } from './button';
import { default as WDialog } from './dialog';
import { default as WTooltip } from './tooltip';
import { default as WScrollNumber } from './scrollNumber';
import { default as WSelect } from './select';
import { default as WDatePicker } from './datePicker';
import { default as WPopover } from './popover';
import { WMessage } from './message';
import { WForm, WFormItem } from "./form";
import { default as WInputNumber } from './inputNumber'
import { default as WPagination } from './pagination'
import { default as WUpload } from './upload'
import { default as WDivider } from './divider'
import { WPrinter } from "./printer";

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
  WPrinter
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
  WPrinter
};

export default {
  install
}
