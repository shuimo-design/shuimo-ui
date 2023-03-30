/**
 * @description jsx vite plugin tools
 * @author 阿怪
 * @date 2023/3/29 10:08
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import path from 'path';

export const resolveRealPath = (id: string) => {return path.resolve(__dirname, id);};
