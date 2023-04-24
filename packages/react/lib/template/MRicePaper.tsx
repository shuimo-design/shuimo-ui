/**
 * @description react version rice paper component
 * @author 阿怪
 * @date 2023/2/7 02:18
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import React from 'react';
import '@shuimo-design/core/lib/template/ricePaper/ricePaper.css';
import { RicePaperProps } from '@shuimo-design/core/lib/template/ricePaper/index.d';
import { Slot } from '../../types';

export default function MRicePaper(props: RicePaperProps & Slot) {
  const mountainTemplate = props.mountain ? <div className="m-rice-paper-mountain"></div> : null;
  const craneTemplate = props.crane ? <div className="m-rice-paper-crane"></div> : null;


  return <div className={['m-rice-paper', !props.cold ? 'm-rice-paper-warn' : undefined].join(' ')}>
    {mountainTemplate}
    {craneTemplate}
    <div className="m-rice-paper-main">
      {props.children}
    </div>
  </div>

}
