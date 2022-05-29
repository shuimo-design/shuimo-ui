/**
 * @description 简单组件类型
 * @author 阿怪
 * @date 2021/8/11 4:57 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import button from "../../lib/base/button/WButton";
import checkbox from "../../lib/base/checkbox/WCheckbox";
import datepicker from "../../lib/base/datePicker/WDatePicker";
import input from "../../lib/base/input/WInput";
import inputNumber from "../../lib/base/inputNumber/WInputNumber";
import radio from "../../lib/base/radio/WRadio";
import select from "../../lib/base/select/WSelect";
import list from "../../lib/base/list/WList";

import dialog from "../../lib/message/dialog/WDialog";
import drawer from "../../lib/message/drawer/WDrawer";
import popover from "../../lib/message/popover/WPopover";
import tooltip from "../../lib/message/tooltip/WTooltip";
import message from "../../lib/message/message/WMessageItem";

import border from "../../lib/other/border/WBorder";
import divider from "../../lib/other/divider/WDivider";
import menu from "../../lib/other/menu/WMenu";
import progress from "../../lib/other/progress/WProgress";
import upload from "../../lib/other/upload/WUpload";

import form from "../../lib/template/form/WForm";
import formItem from "../../lib/template/form/WFormItem";
import pagination from "../../lib/template/pagination/WPagination";
import table from "../../lib/template/table/WTable";
import tableColumn from "../../lib/template/table/WTableColumn";

export type keyType = any;

export type MenuType = {
  title: string,
  key: keyType,
  isActive: boolean,
  index?: number[],
  children?: MenuTypeArr
}
export type MenuTypeArr = Array<MenuType>;


export declare const WButton: typeof button;
export declare const WInput: typeof input;
export declare const WCheckbox: typeof checkbox;
export declare const WDatePicker: typeof datepicker;
export declare const WRadio: typeof radio;
export declare const WSelect: typeof select;
export declare const WList: typeof list;

export declare const WDialog: typeof dialog;
export declare const WDrawer: typeof drawer;
export declare const WPopover: typeof popover;
export declare const WTooltip: typeof tooltip;
export declare const WMessage: typeof message;

export declare const WBorder: typeof border;
export declare const WDivider: typeof divider;
export declare const WInputNumber: typeof inputNumber;
export declare const WMenu: typeof menu;
export declare const WProgress: typeof progress;
export declare const WUpload: typeof upload;

export declare const WForm: typeof form;
export declare const WFormItem: typeof formItem;
export declare const WPagination: typeof pagination;
export declare const WTable: typeof table;
export declare const WTableColumn: typeof tableColumn;
