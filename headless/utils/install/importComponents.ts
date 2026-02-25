/**
 * @description
 * @author 阿怪
 * @date 2024/10/9 00:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Component } from 'vue';


// [base]
import MAvatar from '../../components/base/avatar/MAvatar.tsx';
import MInput from '../../components/base/input/MInput';
import MButton from '../../components/base/button/MButton.tsx';
import MSelect from '../../components/base/select/MSelect.tsx';
import MCheckbox from '../../components/base/checkbox/MCheckbox.tsx';
import MSwitch from '../../components/base/switch/MSwitch.tsx';
import MRadio from '../../components/base/radio/MRadio.tsx';
import MTag from '../../components/base/tag/MTag.tsx';
import MProgress from '../../components/base/progress/MProgress.tsx';
import MLi from '../../components/base/li/MLi.tsx';
import MList from '../../components/base/list/MList.tsx';
import MInputNumber from '../../components/base/inputNumber/MInputNumber.tsx';
import MSlider from '../../components/base/slider/MSlider.tsx';
import MLoading from '../../components/base/loading/MLoading.tsx';
import MDivider from '../../components/base/divider/MDivider.tsx';
import MTooltip from '../../components/base/tooltip/MTooltip.tsx';
// [other]
import MDarkMode from '../../components/other/darkMode/MDarkMode.tsx';
// [message]
import MDialog from '../../components/message/dialog/MDialog.tsx';
import MDrawer from '../../components/message/drawer/MDrawer.tsx';
import MConfirm from '../../components/message/confirm/MConfirm.tsx';
import MMessage from '../../components/message/message/MMessage.tsx';
import MMessageList from '../../components/message/message/MMessageList.tsx';
// [template]
import MRicePaper from '../../components/template/ricePaper/MRicePaper.tsx';
import MVirtualList from '../../components/template/virtualList/MVirtualList.tsx';
import MBorder from '../../components/template/border/MBorder.tsx';
import MBreadcrumb from '../../components/template/breadcrumb/MBreadcrumb.tsx';
import MGrid from '../../components/template/grid/MGrid.tsx';
import MPagination from '../../components/template/pagination/MPagination.tsx';
import MMenu from '../../components/template/menu/MMenu.tsx';
import MMenuItem from '../../components/template/menu/MMenuItem.tsx';
import MPopover from '../../components/base/popover/MPopover.tsx';


export const components: Record<string, Component> = {
  MAvatar,
  MButton,
  MSelect,
  MInput,
  MCheckbox,
  MSwitch,
  MRadio,
  MTag,
  MProgress,
  MLi,
  MList,
  MInputNumber,
  MSlider,
  MLoading,
  MDivider,
  MTooltip,

  MPopover,

  MDialog,
  MDrawer,
  MConfirm,
  MMessage,
  MMessageList,

  MVirtualList,
  MRicePaper,
  MBorder,
  MBreadcrumb,
  MGrid,
  MPagination,
  MMenu,
  MMenuItem,

  MDarkMode,
};


export {
  MAvatar,
  MSelect,
  MInput,
  MCheckbox,
  MSwitch,
  MRadio,
  MTag,
  MProgress,
  MLi,
  MList,
  MInputNumber,
  MSlider,
  MLoading,
  MDivider,
  MTooltip,

  MPopover,

  MDialog,
  MDrawer,
  MConfirm,
  MMessage,
  MMessageList,

  MVirtualList,
  MRicePaper,
  MBorder,
  MBreadcrumb,
  MGrid,
  MPagination,
  MMenu,
  MMenuItem,

  MDarkMode,
};
