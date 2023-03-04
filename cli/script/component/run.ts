/**
 * @description a script to create a new component
 * @author 阿怪
 * @date 2023/3/2 20:19
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import chalk from 'chalk';
import { build } from './build';
import { question } from './question';

const hello = () => {
  console.log(chalk.hex('#861717').bold('Create a component using this script'));
};


const run = async () => {
  hello();
  const { group, name, author, slogan } = await question();

  const MName = `M${name.replace(name[0], name[0].toUpperCase())}`;

  console.log(chalk.hex('')(`ready to create a new component called ${MName}`));

  await build({ name, group, author, slogan });

};

run();
