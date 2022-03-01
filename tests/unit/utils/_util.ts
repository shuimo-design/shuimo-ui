import { expect } from "vitest";

const selectDropdown = async (wrapper: any, teleport: any) => {
  await wrapper.find('.w-select-div').trigger('click');
  expect(teleport.find('.select-dropdown').isVisible()).toBe(true);
}

export {
  selectDropdown
}
