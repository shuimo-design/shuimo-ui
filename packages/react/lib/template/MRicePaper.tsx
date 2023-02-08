/**
 * @description react version rice paper component
 * @author 阿怪
 * @date 2023/2/7 02:18
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import { RicePaperProps, useRicePaper } from '@shuimo-design/core';
import { cr } from '../../tools/coreRender';
import '@shuimo-design/core/lib/template/ricePaper/ricePaper.pcss';

export default function MRicePaper(props: RicePaperProps & { children?: React.ReactNode }) {

  const { getTemplate } = useRicePaper();

  return cr(getTemplate(props), props);
}
