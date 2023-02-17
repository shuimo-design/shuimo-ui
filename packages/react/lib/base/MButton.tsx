/**
 * @description
 * @author 阿怪
 * @date 2023/2/7 17:44
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import { ButtonEvents, ButtonProps, useButton } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';
import '@shuimo-design/core/lib/base/button/button.pcss';


export default function MButton(props: ButtonProps & ButtonEvents & { children?: React.ReactNode }) {

  const { getTemplate } = useButton();

  return cr(getTemplate({
    props, events: { onClick: props.onClick }
  }), props);
}
