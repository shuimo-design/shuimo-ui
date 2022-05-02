/**
 * @description tooltip组件
 * @author 阿怪
 * @date 2022/5/2 08:50
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import WTooltip from "../../../lib/message/tooltip/WTooltip";

describe("tooltip组件", () => {
  test("正常渲染", () => {
    const wrapper = mount(WTooltip);
    expect(wrapper.html()).toContain('w-tooltip');
  });
});
