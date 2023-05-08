/**
 * @description react Playground
 * @author 阿怪
 * @date 2023/4/19 22:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { StrictMode } from 'react';
import { MRicePaper, MBorder } from '@shuimo-design/react/index';
import Base from './Base';
import { useState } from 'react';
import Other from './Other';
import Template from './Template';
import Message from './Message';

export default function Playground() {

  return <StrictMode>
    <MBorder>
      <MRicePaper mountain crane>
        <div className="m-rice-paper-inside">
          <h1>这里是React的playground</h1>
          {Base()}
        </div>
      </MRicePaper>
    </MBorder>
  </StrictMode>;
}
