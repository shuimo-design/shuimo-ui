import {App} from 'vue';

import {default as WInput} from './input';
import {default as WButton} from './button';
import {default as WDialog} from './dialog';
import {default as WTooltip} from './tooltip';
import {default as WScrollNumber} from './scrollNumber';
import {default as WSelect} from './select';
import {default as WDatePicker} from './datePicker';
import {default as WPopover} from './popover'

import '../lib/style.scss'


const components = [
  WInput,
  WButton,
  WDialog,
  WTooltip,
  WScrollNumber,
  WSelect,
  WDatePicker,
  WPopover
]
const install = function (app: App) {
  components.forEach(component => {
    app.use(component);
  });
  return app;
};

export {WInput, WButton, WDialog, WTooltip, WScrollNumber, WSelect, WDatePicker, WPopover};

export default {
  install
}
