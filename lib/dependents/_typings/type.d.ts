declare var global: NodeJS.Global & typeof globalThis;

declare type TimeoutHandle = ReturnType<typeof global.setTimeout>

declare module "*.png" {
  const value: any;
  export = value;
}
