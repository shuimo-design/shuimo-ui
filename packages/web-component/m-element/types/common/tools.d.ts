/**
 * @description some tool types
 * @author 阿怪
 * @date 2022/12/13 00:11
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

type Data = Record<string, unknown>;

type WithArray<T> = T | T[];
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
