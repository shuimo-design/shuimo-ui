/**
 * @description react version dialog
 * @author 阿怪
 * @date 2023/04/10 11:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { useDialog, DialogProps } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';
import { Slot } from '../types';
import { ReactNode, useState } from 'react';

export default function MDialog(props: DialogProps & Slot & { active: ReactNode }) {
  const [visible, setVisible] = useState(props.visible);

  const { getTemplate } = useDialog({
    children: {
      active: props.active ?? ''
    },
    events: {
      handleClick: () => {
        setVisible(!visible);
      },
      closeDialog: () => {
        setVisible(false);
      }
    }
  });

  return cr(getTemplate({
    props: {
      ...props,
      visible
    }
  }), props);
}
