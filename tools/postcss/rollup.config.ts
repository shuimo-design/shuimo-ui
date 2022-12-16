import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";

export default ({
  input: 'index.ts',
  plugins: [typescript(), json()],
  output: [{
    sourcemap: true,
    file: 'dist/index.js',
    format: 'commonjs',
  }],
});
