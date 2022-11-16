/**
 * @description
 * @author 阿怪
 * @date 2022/4/17 01:36
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { WCOPO } from '../../dependents/_types';
import { UploadProps } from './index';

export const props: WCOPO<UploadProps> = {
  fileTypes: { type: String, default: 'png, jpeg' }
};
