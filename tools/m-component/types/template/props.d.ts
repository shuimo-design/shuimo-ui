/**
 * @description
 * @author 阿怪
 * @date 2022/12/13 00:01
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

declare interface MPropOptionsBase<T = any, D = T> {
  type: MPropType<T> | true | null,
  enum?: T[],
}

export declare interface MPropOptions<T = any, D = T> extends MPropOptionsBase {
  required: true,
}

export declare interface MPropOptionsWithDefault<T = any, D = T> extends MPropOptionsBase {
  default: D | DefaultFactory<D> | null | undefined | object;
}


/**
 * @description MComponentObjectPropsOptions
 */
export type MCOPO<P, OK = Required<Pick<P, OptionalKeys<P>>>> = {
  [K in keyof OK]: MPropOptionsWithDefault<OK[K]>
} & {
  [K in keyof Pick<P, RequiredKeys<P>>]-?: MPropOptions<P[K]>
}
