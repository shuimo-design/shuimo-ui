import { MCOPO } from '@shuimo-design/types';
import { TreeProps } from './index';
import {DEFAULT_CONFIG} from "./tree";


export const props: MCOPO<TreeProps> = {
  data: { type: [Object, Array], default: () => []},
  config: { type: Object, default: () => DEFAULT_CONFIG }
};
