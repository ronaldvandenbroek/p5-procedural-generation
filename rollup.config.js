import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
    }),
    resolve(),
    commonjs(),
  ],
  output: {
    dir: 'dist',
    format: 'iife',
    name: 'procedural-generation',
  },
};
