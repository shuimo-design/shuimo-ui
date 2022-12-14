/**
 * @description 类型支持
 * @author 阿怪
 * @date 2022/4/5 9:44 AM
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

export type Data = Record<string, unknown>;

/**
 * @description WComponentObjectPropsOptions
 */
export type WCOPO<P, OK = Required<Pick<P, OptionalKeys<P>>>> = {
  [K in keyof OK]: WPropOptionsWithDefault<OK[K]>
} & {
  [K in keyof Pick<P, RequiredKeys<P>>]-?: WPropOptions<P[K]>
}


export type WPropOptions<T = any, D = T> = {
  type?: WPropType<T> | true | null
  required: true
  default?: D | DefaultFactory<D> | null | undefined | object
  validator?(value: unknown): boolean
}

export type WPropOptionsWithDefault<T = any, D = T> = {
  type?: WPropType<T>
  required?: false
  default: D | DefaultFactory<D> | undefined
  validator?(value: unknown): boolean
}


type DefaultFactory<T> = (props: Data) => T;

// 工具
type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];

type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

export declare type WPropType<T> = WPropConstructor<T> | WPropConstructor<T>[];

type WPropConstructor<T = any> =
  | { new(...args: any[]): T & {} }
  | { (): T }
  | WPropMethod<T>

type WPropMethod<T, TConstructor = any> = [T] extends [
      ((...args: any) => any) | undefined
  ] // if is function with args, allowing non-required functions
  ? { new(): TConstructor; (): T; readonly prototype: TConstructor } // Create Function like constructor
  : never
