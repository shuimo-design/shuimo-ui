declare var global: NodeJS.Global & typeof globalThis;

declare type TimeoutHandle = ReturnType<typeof global.setTimeout>
