/**
 * @description M Component Object Props Options
 * @author 阿怪
 * @date 2022/12/13 00:01
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 * M means Shuimo
 */
export declare type MPropOptions<T = any, D = T> = {
  type: MPropType<T> | true | null,
  required: true,
  default?: D | DefaultFactory<D> | null | undefined | object,
  enum?: T[],

}

export declare type MPropOptionsWithDefault<T = any, D = T> = {
  type: MPropType<T>,
  required?: false,
  default: D | DefaultFactory<D> | null | undefined | object,
  enum?: T[],
}

/**
 * @description MComponentObjectPropsOptions
 */
export type MCOPO<P, OK = Required<Pick<P, OptionalKeys<P>>>> = {
  [K in keyof OK]: MPropOptionsWithDefault<OK[K]>
} & {
  [K in keyof Pick<P, RequiredKeys<P>>]-?: MPropOptions<P[K]>
}


type DefaultFactory<T> = (props: Data) => T;

type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];

type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

type MPropConstructor<T = any> =
  | { new(...args: any[]): T & {} }
  | { (): T }
  | MPropMethod<T>

type MPropMethod<T, TConstructor = any> = [T] extends [
      ((...args: any) => any) | undefined
  ] // if is function with args, allowing non-required functions
  ? { new(): TConstructor; (): T; readonly prototype: TConstructor } // Create Function like constructor
  : never

type MPropType<T> = MPropConstructor<T> | MPropConstructor<T>[];
