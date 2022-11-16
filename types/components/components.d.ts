/**
 * @description 简单组件类型
 * @author 阿怪
 * @date 2021/8/11 4:57 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import button from '../../lib/base/button/MButton';
import checkbox from '../../lib/base/checkbox/MCheckbox';
import datepicker from '../../lib/base/datePicker/MDatePicker';
import input from '../../lib/base/input/MInput';
import inputNumber from '../../lib/base/inputNumber/MInputNumber';
import radio from '../../lib/base/radio/MRadio';
import select from '../../lib/base/select/MSelect';
import list from '../../lib/base/list/MList';
import tag from '../../lib/base/tag/MTag';

import dialog from '../../lib/message/dialog/MDialog';
import drawer from '../../lib/message/drawer/MDrawer';
import popover from '../../lib/message/popover/MPopover';
import tooltip from '../../lib/message/tooltip/MTooltip';
import message from '../../lib/message/message/MMessageItem';

import border from '../../lib/other/border/MBorder';
import divider from '../../lib/other/divider/MDivider';
import loading from '../../lib/other/loading/MLoading';
import menu from '../../lib/other/menu/MMenu';
import progress from '../../lib/other/progress/MProgress';
import upload from '../../lib/other/upload/MUpload';

import form from '../../lib/template/form/MForm';
import formItem from '../../lib/template/form/MFormItem';
import pagination from '../../lib/template/pagination/MPagination';
import table from '../../lib/template/table/MTable';
import tableColumn from '../../lib/template/table/MTableColumn';
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

export declare const MButton: typeof button;
export declare const MInput: typeof input;
export declare const MCheckbox: typeof checkbox;
export declare const MDatePicker: typeof datepicker;
export declare const MRadio: typeof radio;
export declare const MSelect: typeof select;
export declare const MList: typeof list;
export declare const MTag: typeof tag;

export declare const MDialog: typeof dialog;
export declare const MDrawer: typeof drawer;
export declare const MPopover: typeof popover;
export declare const MTooltip: typeof tooltip;
export declare const MMessage: typeof message;

export declare const MBorder: typeof border;
export declare const MDivider: typeof divider;
export declare const MLoading: typeof loading;
export declare const MInputNumber: typeof inputNumber;
export declare const MMenu: typeof menu;
export declare const MProgress: typeof progress;
export declare const MUpload: typeof upload;

export declare const MForm: typeof form;
export declare const MFormItem: typeof formItem;
export declare const MPagination: typeof pagination;
export declare const MTable: typeof table;
export declare const MTableColumn: typeof tableColumn;
export declare const MRicePaper: typeof ricePaper;
