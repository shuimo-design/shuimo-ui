/**
 * @description customer element types
 * @author 阿怪
 * @date 2023/1/29 15:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { initDecorator } from '../core/decorator/init';
import { renderDecorator } from '../core/decorator/render';
import initCustomerElement from '../core/initCustomerElement';


export type InitCustomerElementType = ReturnType<typeof initCustomerElement>;
export type InitElementType = ReturnType<ReturnType<typeof initDecorator>>;
export type RenderElementType = ReturnType<ReturnType<typeof renderDecorator>>;
