/**
 * @description file tools
 * @author 阿怪
 * @date 2023/3/3 15:20
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import fs from 'fs';
import Mustache from 'mustache';
import * as path from 'path';
import * as readline from 'readline';

export const touchAndWrite = (url: string, data = '') => {
  fs.writeFile(url, data, function (err) {
    if (err) {
      console.log(path.resolve(url));
      console.error(err);
      console.warn(`${url} is created`);
      return;
    }
    console.log(`${url} created`);
  });
};


export const renderTemplate = (url: string, file: string, data: Record<string, any>) => {
  const str = fs.readFileSync(path.resolve(`./component/template/${url}`), 'utf-8');
  const fileInfo = Mustache.render(str, data);

  touchAndWrite(file, fileInfo);
};


export const insertLine = (file: string, line: number, data: string) => {
  const fileContent = fs.readFileSync(file, 'utf-8').split('\n');
  fileContent.splice(line, 0, data);
  const updatedContent = fileContent.join('\n');
  fs.writeFileSync(file, updatedContent);
};

type UpdateInfo = {
  checkFn: (line: string) => boolean,
  data: string
}
export const updateFile = async (options: {
  path: string,
  group: string,
  list: UpdateInfo[]
}) => {
  const { path, group, list } = options;
  const rl = readline.createInterface({
    input: fs.createReadStream(path),
    crlfDelay: Infinity
  });


  let index = -1;
  const goIteration = async (list: UpdateInfo[]) => {
    let isGroup = false;

    const goLine = () => new Promise<number[]>(resolve => {

      let fnIndex = 0;
      let current = list[fnIndex];
      const resIndexList: number[] = [];
      rl.on('line', line => {
        index++;
        if (line.includes(`[${group}]`)) {
          isGroup = true;
        }

        if (isGroup) {
          if (current.checkFn(line)) {
            resIndexList.push(index);
            fnIndex++;
            isGroup = false;
            current = list[fnIndex];
            if (fnIndex >= list.length) {
              resolve(resIndexList);
              rl.removeAllListeners();
            }
          }
        }
      });
      rl.addListener('close', () => {
        if (isGroup) {
          resIndexList.push(index + 1);
        }
        resolve(resIndexList);
        rl.removeAllListeners();
      });
    });


    const resIndexList = await goLine();
    for (let i = 0; i < resIndexList.length; i++) {
      const resIndex = resIndexList[i];
      await insertLine(path, resIndex + i, list[i].data);
    }
  };

  await goIteration(list);

};
