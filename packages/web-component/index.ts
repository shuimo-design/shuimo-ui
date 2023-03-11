/**
 * @description
 * @author 阿怪
 * @date 2022/12/10 14:05
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
// [base]
import Button from './lib/base/MButton';
import Input from './lib/base/MInput';
import Checkbox from './lib/base/MCheckBox';
import Li from './lib/base/Mli';
import Select from './lib/base/MSelect';
import Option from './lib/base/MOption';
import MSwitch from './lib/base/MSwitch';
import MRadio from './lib/base/MRadio';
import MTag from './lib/base/MTag';
import MProgress from './lib/base/MProgress';

// [message]
import Popover from './lib/message/MPopover';

// [template]
import Border from './lib/template/MBorder';
import Menu from './lib/template/MMenu';
import MenuItem from './lib/template/MMenuItem';
import RicePaper from './lib/template/MRicePaper';
import MForm from './lib/template/MForm';
import MFormItem from './lib/template/MFormItem';

// [other]
import Divider from './lib/other/MDivider';
import TaiChi from './lib/other/MTaiChi';
import MLoading from './lib/other/MLoading';

import { webComponentStyleInstall } from './lib/style';

const ShuimoWebComponent = {
  // [base]
  Button,
  Input,
  Checkbox,
  Li,
  MSwitch,
  Select,
  Option,
  MRadio,
  MTag,
  MProgress,

  // [message]
  Popover,

  // [template]
  Border,
  Menu, MenuItem,
  RicePaper,
  MForm,
  MFormItem,

  // [other]
  TaiChi,
  Divider,
  MLoading,
};

webComponentStyleInstall();
