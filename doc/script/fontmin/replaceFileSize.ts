/**
 * @description
 * @author 阿怪
 * @date 2022/10/9 23:57
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */


import * as fs from 'fs';


const s = fs.statSync('../../.output/public/fonts/wljh.ttf');

const file = '../../.output/server/chunks/runtime.mjs';
fs.readFile(file, (err, data) => {
  let str = data.toString();
  const info = str.match(/\/fonts\/wljh.ttf[^}]*/);
  if (info) {
    const newInfo = info[0].replace('"size": 20725112', `"size": ${s.size}`);
    str = str.replaceAll(/\/fonts\/wljh.ttf[^}]*/g, newInfo);
    fs.writeFile(file, str, err => {
      if (err) {
        console.error(err);
      }
    });
  }
});
