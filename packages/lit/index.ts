/**
 * @description
 * @author 阿怪
 * @date 2022/12/10 14:05
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { webComponentStyleInstall } from './lib/style';


export const initWebComponent = async (prev = 'm') => {
  window.shuimo = { wc: { prev } };
  await Promise.all([
    // [base]
    import('./lib/base/MButton'),
    import('./lib/base/MInput'),
    import('./lib/base/MCheckBox'),
    import('./lib/base/MLi'),
    import('./lib/base/MList'),
    // import('./lib/base/MSelect'),
    // import('./lib/base/MOption'),
    import('./lib/base/MSwitch'),
    import('./lib/base/MRadio'),
    import('./lib/base/MTag'),
    import('./lib/base/MProgress'),
    import('./lib/base/MAvatar'),
    import('./lib/base/MSelect'),
    import('./lib/base/MDatePicker'),

    // [message]
    import('./lib/message/MPopover'),
    import('./lib/message/MDialog'),
    import('./lib/message/MDrawer'),
    import('./lib/message/MConfirm'),

    // [template]
    import('./lib/template/MBorder'),
    // import('./lib/template/MMenu'),
    // import('./lib/template/MMenuItem'),
    import('./lib/template/MRicePaper'),
    import('./lib/template/MForm'),
    import('./lib/template/MFormItem'),
    import('./lib/template/MTable'),
    import('./lib/template/MTableColumn'),

    // [other]
    import('./lib/other/MDivider'),
    import('./lib/other/MDarkMode'),
    import('./lib/other/MLoading'),
    import('./lib/other/MDeleteIcon'),

  ]);
  window.shuimo = undefined;
};


webComponentStyleInstall();
