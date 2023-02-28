/**
 * @description shuimo vue component index
 * @author 阿怪
 * @date 2023/1/14 01:28
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { App, Component } from 'vue';
import MButton from './base/MButton';
import MInput from './base/MInput';
import MCheckbox from './base/MCheckbox';
import MLi from './base/MLi';
import MSwitch from './base/MSwitch';
import MRadio from './base/MRadio';

import MPopover from './message/MPopover';

import MRicePaper from './template/MRicePaper';
import MBorder from './template/MBorder';

const components: Record<string, Component> = {
  MButton,
  MInput,
  MCheckbox,
  MLi,
  MSwitch,
  MRadio,

  MPopover,

  MRicePaper,
  MBorder
};

export {
  MButton,
  MInput,
  MCheckbox,
  MLi,
  MSwitch,
  MRadio,

  MPopover,

  MRicePaper,
  MBorder
};

export function createMUI() {
  return {
    install: (app: App) => {
      Object.keys(components).forEach(key => {
        app.component(key, components[key]);
      });
      // app.directive('loading', loadingDirective);
      return app;
    }
  };
}
