/**
 * @description
 * @author 阿怪
 * @date 2022/12/12 14:13
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import useGlobal from './useGlobal';

import { buttonProps, useButton } from './base/button/useButton';
import { inputProps, useInput } from './base/input/useInput';
import { checkboxProps, useCheckbox } from './base/checkbox/useCheckbox';
import { liProps, useLi } from './base/list/li/useLi';
import { selectProps, useSelect } from './base/select/useSelect';

import { usePopover } from './message/popover/usePopover';


import { useBorder } from './template/border/useBorder';
import { menuProps, useMenu } from './template/menu/useMenu';
import { useMenuItem } from './template/menu/useMenuItem';
import { ricePaperProps, useRicePaper } from './template/ricePaper/useRicePaper';

import { useTaiChi } from './other/TaiChi/useTaiChi';

export {
  useGlobal,

  buttonProps, useButton,
  inputProps, useInput,
  checkboxProps, useCheckbox,
  liProps, useLi,

  useBorder,
  menuProps, useMenu, useMenuItem,
  ricePaperProps, useRicePaper
};
