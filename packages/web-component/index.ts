/**
 * @description
 * @author 阿怪
 * @date 2022/12/10 14:05
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import Button from './lib/base/button';
import Input from './lib/base/input';
import Checkbox from './lib/base/checkbox';
import Li from './lib/base/list/li';
import Select from './lib/base/select';

import Popover from './lib/message/popover';


import Border from './lib/template/border';
import Menu from './lib/template/menu/menu';
import MenuItem from './lib/template/menu/menuItem';
import RicePaper from './lib/template/ricePaper';

import TaiChi from './lib/other/TaiChi';

import { webComponentStyleInstall } from './lib/style';

const ShuimoWebComponent = {
  Button,
  Input,
  Checkbox,
  Li,
  Select,

  Popover,



  Border,
  Menu, MenuItem,
  RicePaper,

  TaiChi,
};

webComponentStyleInstall();
