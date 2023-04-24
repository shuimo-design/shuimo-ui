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
import MButton from './lib/base/MButton';
import MInput from './lib/base/MInput';
import MCheckbox from './lib/base/MCheckbox';
// import MLi from './base/MLi';
import MSwitch from './lib/base/MSwitch';
import MRadio from './lib/base/MRadio';
import MTag from './lib/base/MTag';
import MProgress from './lib/base/MProgress';


// [other]
import MDivider from './lib/other/MDivider';
import MLoading from './lib/other/MLoading';

// [message]
import MPopover from './lib/message/MPopover';
import MDialog from './lib/message/MDialog';

// [template]
import MRicePaper from './lib/template/MRicePaper';
import MBorder from './lib/template/MBorder';
// import MForm from './lib/template/MForm';
// import MFormItem from './lib/template/MFormItem';
import MTable from './lib/template/MTable';
import MTableColumn from './lib/template/MTableColumn';

const components: Record<string, Component> = {
  // [base]
  MButton,
  MInput,
  MCheckbox,
  // MLi,
  MSwitch,
  MRadio,
  MTag,
  MProgress,

  // [other]
  MDivider,
  MLoading,

  // [message]
  MPopover,
  MDialog,

  // [template]
  MRicePaper,
  MBorder,
  // MForm,
  // MFormItem,
  MTable,
  MTableColumn,
};

export {
  // [base]
  MButton,
  MInput,
  MCheckbox,
  // MLi,
  MSwitch,
  MRadio,
  MTag,
  MProgress,

  // [other]
  MDivider,
  MLoading,

  // [message]
  MPopover,
  MDialog,

  // [template]
  MRicePaper,
  MBorder,
  // MForm,
  // MFormItem,
  MTable,
  MTableColumn,
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
