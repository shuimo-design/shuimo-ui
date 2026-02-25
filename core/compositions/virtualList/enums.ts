/**
 * @description 虚拟列表 action 枚举
 * @author 阿怪
 * @date 2026/2/25 13:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

/** 元素可见性变化的动作类型 */
export enum ACTION {
  /** 从顶部进入可视区域（开始露出） */
  ENTER_TOP_START,
  /** 从顶部完全进入可视区域 */
  ENTER_TOP_END,
  /** 从底部进入可视区域（开始露出） */
  ENTER_BOTTOM_START,
  /** 从底部完全进入可视区域 */
  ENTER_BOTTOM_END,
  /** 从顶部开始离开可视区域 */
  LEAVE_TOP_START,
  /** 从顶部完全离开可视区域 */
  LEAVE_TOP_END,
  /** 从底部开始离开可视区域 */
  LEAVE_BOTTOM_START,
  /** 从底部完全离开可视区域 */
  LEAVE_BOTTOM_END,
  /** 未知状态 */
  UNKNOWN,
}

/** 元素相对于容器的位置类型 */
export enum POSITION_TYPE {
  /** 完全在可视区域上方 */
  TOP,
  /** 部分在可视区域上方（上半部分露出） */
  TOP_VISIBLE,
  /** 完全在可视区域内 */
  VISIBLE,
  /** 部分在可视区域下方（下半部分露出） */
  BOTTOM_VISIBLE,
  /** 完全在可视区域下方 */
  BOTTOM,
}

/** 元素信息记录 */
export type EntryInfo = {
  ratio: number;
  position: POSITION_TYPE;
  realIndex: number;
  translateY: number;
};
