/**
 * @Description: 简单组件类型
 * @Author: 菩萨蛮
 * @Date: 2021/8/11 4:57 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */


import { DefineComponent } from "vue";

export type keyType = any;

export type MenuType = {
  title: string,
  key: keyType,
  isActive: boolean,
  index?: number[],
  children?: MenuTypeArr
}
export type MenuTypeArr = Array<MenuType>;


export const WInput: DefineComponent;
export const WButton: DefineComponent;
export const WDialog: DefineComponent;
export const WAdventureDialog: DefineComponent;
export const WTooltip: DefineComponent;
export const WScrollNumber: DefineComponent;
export const WSelect: DefineComponent;
export const WDatePicker: DefineComponent;
export const WPopover: DefineComponent;
export const WForm: DefineComponent;
export const WFormItem: DefineComponent;
export const WInputNumber: DefineComponent;
export const WPagination: DefineComponent;
export const WUpload: DefineComponent;
export const WDivider: DefineComponent;
export const WProcess: DefineComponent;
export const WRadio: DefineComponent;
export const WCheckbox: DefineComponent;
export const WMenu: DefineComponent;
export const WTabs: DefineComponent;
export const WTabPane: DefineComponent;
export const WTable: DefineComponent;
export const WTableColumn: DefineComponent;
export const WBorder: DefineComponent;
export const WDrawer: DefineComponent;
