/**
 * @description
 * @author 阿怪
 * @date 2023/4/19 15:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createApp } from 'vue';
import App from './src/App.vue';
import { createMUI } from 'shuimo-ui/index';
import 'shuimo-ui/index.css';


createApp(App)
  // .use(createMUI({
  //   disableWebComponent: ['MRicePaper','MBorder']
  // }))
  .use(createMUI())
  .mount('#app');
