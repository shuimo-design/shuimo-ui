/**
 * @description question
 * @author 阿怪
 * @date 2023/3/2 20:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Questions } from './types';
import inquirer from 'inquirer';


export enum GROUP_ENUM {
  BASE = 'base',
  MESSAGE = 'message',
  OTHER = 'other',
  TEMPLATE = 'template',
}

export const NEW_GROUP = 'new a group';

const notEmptyStr = (str = 'can not be empty') => {
  return (input: string) => {
    if (input === '') {
      return str;
    }
    return true;
  };
};

export const aInquirer: Questions.AInquirerI = q => new Promise(async (resolve, reject) => {
  try {
    const answers = await inquirer.prompt(q);
    resolve(answers);
  } catch (e) {
    reject(e);
  }
});

const choices = [
  GROUP_ENUM.BASE,
  GROUP_ENUM.MESSAGE,
  GROUP_ENUM.OTHER,
  GROUP_ENUM.TEMPLATE,
  NEW_GROUP
];

export const selectGroup = [
  { name: 'group', type: 'list', message: 'please select group', choices, default: choices[0] }
];

export const componentQuestion = [
  {
    name: 'name',
    type: 'input',
    message: 'please input component name, like button, darkMode etc.',
    validate: notEmptyStr('component name can not be empty')
  },
  {
    name: 'author',
    type: 'input',
    message: 'please input your nickname (comments author)'
  },
  {
    name: 'slogan',
    type: 'input',
    message: 'please input your slogan! I\'m sure everyone needs a slogan'
  }
];


export const question = async () => {
  const answer = await aInquirer(selectGroup);
  const { group } = answer;
  if (group === NEW_GROUP) {
    // todo create a new group first
    console.log('not support yet');
    return { group, name: '' };
  }
  const componentAnswer = await aInquirer(componentQuestion);
  const { name, author, slogan } = componentAnswer;

  return { group, name, author, slogan };
};
