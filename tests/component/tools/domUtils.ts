/**
 * @description dom utils
 * @author 阿怪
 * @date 2022/4/23 02:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { DOMWrapper, VueWrapper } from "@vue/test-utils";
import { VNode } from "vue";

type DWrapper = VueWrapper<any> | DOMWrapper<any>;
export const dGet = (wrapper: DWrapper, selector: string) => {
  const element = wrapper.element.querySelector(selector);
  if (!element) {
    throw new Error(`Unable to get ${selector} within: ${wrapper.html()}`);
  }
  return new DOMWrapper(element);
}

export const getTeleport = (wrapper: VueWrapper<any>) => {
  try {
    // @ts-ignore
    return wrapper.getCurrentComponent().subTree.component.subTree.children[0].children[0].children[2] as VNode;
  } catch (e) {
    throw new Error(`Unable to get teleport within: ${wrapper.html()}`);
  }
}
