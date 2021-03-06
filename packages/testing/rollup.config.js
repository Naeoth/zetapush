import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import ts from 'rollup-plugin-typescript';
import typescript from 'typescript';
import { uglify } from 'rollup-plugin-uglify';
import { minify as minifier } from 'uglify-es';

const env = process.env.NODE_ENV;
const config = {
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      // preferBuiltins: true,
    }),
    commonjs({
      include: [
        'node_modules/**',
        '../cometd/**',
        '../common/**',
        '../core/**',
        '../client/**',
        '../worker/**',
      ],
    }),
    ts({
      typescript,
    }),
    json(),
    sizeSnapshot(),
  ],
  output: {
    name: 'ZetaPushTesting',
    format: 'umd',
    globals: {
      '@zetapush/client': 'ZetaPushClient',
      '@zetapush/common': 'ZetaPushCommon',
      '@zetapush/platform-legacy': 'ZetaPushPlatformLegacy',
    },
    sourcemap: true,
  },
};

if (env === 'production') {
  config.plugins.push(
    uglify(
      {
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      },
      minifier,
    ),
  );
}

export default config;
