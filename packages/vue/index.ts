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
import MLi from './lib/base/MLi';
import MList from './lib/base/MList';
import MSwitch from './lib/base/MSwitch';
import MRadio from './lib/base/MRadio';
import MTag from './lib/base/MTag';
import MProgress from './lib/base/MProgress';
import MAvatar from './lib/base/MAvatar';
import MSelect from './lib/base/MSelect';
import MDatePicker from './lib/base/MDatePicker';

// [other]
import MDivider from './lib/other/MDivider';
import MLoading from './lib/other/MLoading';
import MDarkMode from './lib/other/MDarkMode';
import MDeleteIcon from './lib/other/MDeleteIcon';
import MPrinter from '@shuimo-design/core/lib/other/printer/Printer';

// [message]
import MPopover from './lib/message/MPopover';
import MDialog from './lib/message/MDialog';
import MDrawer from './lib/message/MDrawer';
import MConfirm from './lib/message/MConfirm';
import MMessage from './lib/message/message/MMessage';

// [template]
import MRicePaper from './lib/template/MRicePaper';
import MBorder from './lib/template/MBorder';
import MForm from './lib/template/MForm';
import MFormItem from './lib/template/MFormItem';
import MTable from './lib/template/MTable';
import MTableColumn from './lib/template/MTableColumn';
import MPagination from './lib/template/MPagination';

const components: Record<string, Component> = {
  // [base]
  MButton,
  MInput,
  MCheckbox,
  MLi,
  MList,
  MSwitch,
  MRadio,
  MTag,
  MProgress,
  MAvatar,
  MSelect,
  MDatePicker,

  // [other]
  MDivider,
  MLoading,
  MDarkMode,
  MDeleteIcon,

  // [message]
  MPopover,
  MDialog,
  MDrawer,

  // [template]
  MRicePaper,
  MBorder,
  MForm,
  MFormItem,
  MTable,
  MTableColumn,
  MPagination,
};

export {
  // [base]
  MButton,
  MInput,
  MCheckbox,
  MLi,
  MList,
  MSwitch,
  MRadio,
  MTag,
  MProgress,
  MAvatar,
  MSelect,
  MDatePicker,

  // [other]
  MDivider,
  MLoading,
  MDarkMode,
  MDeleteIcon,
  MPrinter,

  // [message]
  MPopover,
  MDialog,
  MDrawer,
  MConfirm,
  MMessage,

  // [template]
  MRicePaper,
  MBorder,
  MForm,
  MFormItem,
  MTable,
  MTableColumn,
  MPagination,
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
