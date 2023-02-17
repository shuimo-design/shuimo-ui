/**
 * @description
 * @author 阿怪
 * @date 2023/2/6 17:36
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { createApp } from 'vue';
import App from './App.vue';
const { MODE } = import.meta.env;

const app = createApp(App);

if (MODE === 'web-component') {
  import('../loader/web-component');
}

if (MODE === 'vue') {
  const { createMUI } = await import( 'shuimo-ui/lib');
  app.use(createMUI());
}

app.mount('#app');
