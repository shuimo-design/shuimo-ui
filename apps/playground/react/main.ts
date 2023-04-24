/**
 * @description react main
 * @author 阿怪
 * @date 2023/4/19 15:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
 import {createElement} from 'react';
 import {createRoot} from 'react-dom/client';
import Playground from './src/Playground';



const root = createRoot(document.getElementById('app')!);

root.render(createElement(Playground));
