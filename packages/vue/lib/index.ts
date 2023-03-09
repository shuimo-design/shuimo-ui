/**
 * @description shuimo vue component index
 * @author 阿怪
 * @date 2023/1/14 01:28
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { App, Component } from 'vue';
// [base]
import MButton from './base/MButton';
import MInput from './base/MInput';
import MCheckbox from './base/MCheckbox';
import MLi from './base/MLi';
import MSwitch from './base/MSwitch';
import MRadio from './base/MRadio';
import MTag from './base/MTag';
import MProgress from './base/MProgress';

// [other]
import MDivider from './other/MDivider';
import MLoading from './other/MLoading';

// [message]
import MPopover from './message/MPopover';

// [template]
import MRicePaper from './template/MRicePaper';
import MBorder from './template/MBorder';

const components: Record<string, Component> = {
  // [base]
  MButton,
  MInput,
  MCheckbox,
  MLi,
  MSwitch,
  MRadio,
  MTag,
  MProgress,

  // [other]
  MDivider,
  MLoading,

  // [message]
  MPopover,

  // [template]
  MRicePaper,
  MBorder,
};

export {
  // [base]
  MButton,
  MInput,
  MCheckbox,
  MLi,
  MSwitch,
  MRadio,
  MTag,
  MProgress,

  // [other]
  MDivider,
  MLoading,

  // [message]
  MPopover,

  // [template]
  MRicePaper,
  MBorder,
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
