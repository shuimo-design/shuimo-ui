/**
 * @description common types
 * @author 阿怪
 * @date 2023/3/2 20:42
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { Answers, QuestionCollection } from 'inquirer';

export namespace Questions {


  interface AInquirerI {
    <T extends Answers>(q: QuestionCollection<T>): Promise<T>;
  }

}
