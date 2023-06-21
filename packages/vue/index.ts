/**
 * @description shuimo vue component index
 * @author 阿怪
 * @date 2023/1/14 01:28
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { App, Component } from 'vue';
import './index.css';
import { MUIOption, MWCType } from './types/shuimo-ui';
// [base]
import MButton from './lib/base/MButton';
import MInput from './lib/base/MInput';
import MCheckbox from './lib/base/checkbox/MCheckbox';
import MCheckboxGroup from './lib/base/checkbox/MCheckboxGroup';
import MLi from './lib/base/MLi';
import MList from './lib/base/MList';
import MSwitch from './lib/base/MSwitch';
import MRadio from './lib/base/MRadio';
import MTag from './lib/base/MTag';
import MProgress from './lib/base/MProgress';
import MAvatar from './lib/base/MAvatar';
import MSelect from './lib/base/MSelect';
import MDatePicker from './lib/base/MDatePicker';
import MInputNumber from './lib/base/MInputNumber';

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
import MTooltip from './lib/message/MTooltip';

// [template]
import MRicePaper from './lib/template/ricePaper/MRicePaper';
import MBorder from './lib/template/border/MBorder';
import MForm from './lib/template/MForm';
import MFormItem from './lib/template/MFormItem';
import MTable from './lib/template/MTable';
import MTableColumn from './lib/template/MTableColumn';
import MPagination from './lib/template/MPagination';
import MWCBorder from './lib/template/border/MWCBorder';
import MWCRicePaper from './lib/template/ricePaper/MWCRicePaper';
import MCell from './lib/template/MCell';

const components: Record<string, Component> = {
  // [base]
  MButton,
  MInput,
  MCheckbox,
  MCheckboxGroup,
  MLi,
  MList,
  MSwitch,
  MRadio,
  MTag,
  MProgress,
  MAvatar,
  MSelect,
  MDatePicker,
  MInputNumber,

  // [other]
  MDivider,
  MLoading,
  MDarkMode,
  MDeleteIcon,

  // [message]
  MPopover,
  MDialog,
  MDrawer,
  MTooltip,

  // [template]
  MRicePaper,
  MBorder,
  MForm,
  MFormItem,
  MTable,
  MTableColumn,
  MPagination,
  MCell,
};

export {
  // [base]
  MButton,
  MInput,
  MCheckbox,
  MCheckboxGroup,
  MLi,
  MList,
  MSwitch,
  MRadio,
  MTag,
  MProgress,
  MAvatar,
  MSelect,
  MDatePicker,
  MInputNumber,

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
  MTooltip,

  // [template]
  MRicePaper,
  MBorder,
  MForm,
  MFormItem,
  MTable,
  MTableColumn,
  MPagination,
  MCell,
};

export function createMUI(options?: MUIOption) {
  return {
    install: (app: App) => {

      const { disableWebComponent } = options ?? {};
      const useWebComponent = new Map([
        ['MBorder', { key: 'm-border', component: MWCBorder }],
        ['MRicePaper', { key: 'm-rice-paper', component: MWCRicePaper }]
      ]);
      if (disableWebComponent && Array.isArray(disableWebComponent) && disableWebComponent.length > 0) {
        // remove useWebComponent key in disableWebComponent
        disableWebComponent.forEach((item) => {
          useWebComponent.delete(item);
        });
      }
      if (useWebComponent.size > 0) {
        Array.from(useWebComponent).forEach(
          ([key, value]) => {
            customElements.define(value.key, value.component);
          });
      }

      Object.keys(components).forEach(key => {
        if (useWebComponent.has(key as MWCType)) {
          return;
        }
        app.component(key, components[key]);
      });
      // app.directive('loading', loadingDirective);
      return app;
    }
  };
}
