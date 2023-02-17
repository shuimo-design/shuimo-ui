/**
 * @description
 * @author 阿怪
 * @date 2023/2/10 11:39
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineConfig } from 'vitest/config';
import { shuimoCoreTsx } from '@shuimo-design/jsx';

export default defineConfig({
  plugins:[
    shuimoCoreTsx('web-component', { includes: 'lit/test' })
  ]
})
