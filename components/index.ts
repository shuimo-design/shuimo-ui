import {App} from 'vue';

import {default as WInput} from './input';
import {default as WButton} from './button';
import {default as WDialog} from './dialog';
import {default as WTooltip} from './tooltip';
import {default as WScrollNumber} from './scrollNumber';
import {default as WSelect} from './select';

const components = [
  WInput,
  WButton,
  WDialog,
  WTooltip,
  WScrollNumber,
  WSelect
]
const install = function (app: App) {
  components.forEach(component => {
    app.use(component);
  });
  return app;
};

export {WInput, WButton, WDialog, WTooltip, WScrollNumber, WSelect};

export default {
  install
}
