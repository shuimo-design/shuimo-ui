/**
 * @description
 * @author 阿怪
 * @date 2023/2/6 17:07
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import Playground from './src/Playground';
import { MRicePaper } from '@shuimo-design/react';
import './style.css';


const { MODE } = import.meta.env;
export default function App() {
  return (
    <MRicePaper className={'main-paper'}>
      <div className="base">
        <h1>这里是{MODE}的playground</h1>
        <Playground/>
      </div>
    </MRicePaper>
  );
}
