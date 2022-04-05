/**
 * @Description: 简单组件类型
 * @Author: 菩萨蛮
 * @Date: 2021/8/11 4:57 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import button from "../../lib/base/button/WButton";
import checkbox from "../../lib/base/checkbox/WCheckbox.vue";
import datepicker from "../../lib/base/datePicker/WDatePicker";
import input from "../../lib/base/input/WInput";
import radio from "../../lib/base/radio/WRadio";
import select from "../../lib/base/select/WSelect";

import dialog from "../../lib/message/dialog/WDialog";
import drawer from "../../lib/message/drawer/WDrawer";
import popover from "../../lib/message/popover/WPopover";
import tooltip from "../../lib/message/tooltip/WTooltip";

import border from "../../lib/other/border/WBorder";
import divider from "../../lib/other/divider/WDivider";
import inputNumber from "../../lib/other/inputNumber/WInputNumber";
import menu from "../../lib/other/menu/WMenu";
import progress from "../../lib/other/progress/WProgress";
import scrollNumber from "../../lib/other/scrollNumber/WScrollNumber";
import upload from "../../lib/other/upload/WUpload";

import form from "../../lib/template/form/WForm";
import formItem from "../../lib/template/form/WFormItem.vue";
import pagination from "../../lib/template/pagination/WPagination";
import table from "../../lib/template/table/WTable";
import tab from "../../lib/template/tabs/WTabs";
import tabPane from "../../lib/template/tabs/WTabPane";
import tree from "../../lib/template/tree/WTree";
import treeItem from "../../lib/template/tree/WTreeItem";

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

export declare const WDialog: typeof dialog;
export declare const WDrawer: typeof drawer;
export declare const WPopover: typeof popover;
export declare const WTooltip: typeof tooltip;

export declare const WBorder: typeof border;
export declare const WDivider: typeof divider;
export declare const WInputNumber: typeof inputNumber;
export declare const WMenu: typeof menu;
export declare const WProgress: typeof progress;
export declare const WScrollNumber: typeof scrollNumber;
export declare const WUpload: typeof upload;

export declare const WForm: typeof form;
export declare const WFormItem: typeof formItem;
export declare const WPagination: typeof pagination;
export declare const WTable: typeof table;
export declare const WTabs: typeof tab;
export declare const WTabPane: typeof tabPane;
export declare const WTree: typeof tree;
export declare const WTreeItem: typeof treeItem;
