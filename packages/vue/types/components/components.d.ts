/**
 * @description 简单组件类型
 * @author 阿怪
 * @date 2021/8/11 4:57 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import avatar from '../../lib/base/MAvatar';
import button from '../../lib/base/MButton';
import checkbox from '../../lib/base/checkbox/MCheckbox';
import checkboxGroup from '../../lib/base/checkbox/MCheckboxGroup';
import datepicker from '../../lib/base/MDatePicker';
import input from '../../lib/base/MInput';
import inputNumber from '../../lib/base/MInputNumber';
import radio from '../../lib/base/MRadio';
import select from '../../lib/base/MSelect';
import list from '../../lib/base/MList';
import tag from '../../lib/base/MTag';
import progress from '../../lib/base/MProgress';


import dialog from '../../lib/message/MDialog';
import drawer from '../../lib/message/MDrawer';
import popover from '../../lib/message/MPopover';
import tooltip from '../../lib/message/MTooltip';
import message from '../../lib/message/message/MMessageItem';

import divider from '../../lib/other/MDivider';
import darkMode from '../../lib/other/MDarkMode';
import loading from '../../lib/other/loading/MLoading';
// import menu from '../../lib/other/MMenu';

import border from '../../lib/template/border/MBorder';
import form from '../../lib/template/MForm';
import formItem from '../../lib/template/MFormItem';
import pagination from '../../lib/template/MPagination';
import table from '../../lib/template/MTable';
import tableColumn from '../../lib/template/MTableColumn';
import ricePaper from '../../lib/template/ricePaper/MRicePaper';

export type keyType = any;

export type MenuType = {
  title: string,
  key: keyType,
  isActive: boolean,
  index?: number[],
  children?: MenuTypeArr
}
export type MenuTypeArr = Array<MenuType>;

export declare const MAvatar: typeof avatar;
export declare const MButton: typeof button;
export declare const MInput: typeof input;
export declare const MCheckbox: typeof checkbox;
export declare const MCheckboxGroup: typeof checkboxGroup;
export declare const MDatePicker: typeof datepicker;
export declare const MRadio: typeof radio;
export declare const MSelect: typeof select;
export declare const MList: typeof list;
export declare const MTag: typeof tag;
export declare const MProgress: typeof progress;

export declare const MDialog: typeof dialog;
export declare const MDrawer: typeof drawer;
export declare const MPopover: typeof popover;
export declare const MTooltip: typeof tooltip;
export declare const MMessage: typeof message;

export declare const MBorder: typeof border;
export declare const MDivider: typeof divider;
export declare const MDarkMode: typeof darkMode;
export declare const MLoading: typeof loading;
export declare const MInputNumber: typeof inputNumber;
// export declare const MMenu: typeof menu;

export declare const MForm: typeof form;
export declare const MFormItem: typeof formItem;
export declare const MPagination: typeof pagination;
export declare const MTable: typeof table;
export declare const MTableColumn: typeof tableColumn;
export declare const MRicePaper: typeof ricePaper;
