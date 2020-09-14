const { rollup } = require('rollup')
const { babel } = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')
const rollupJson = require('@rollup/plugin-json')
const commonjs = require('@rollup/plugin-commonjs')
const replace = require('@rollup/plugin-replace')
const esbuild = require('rollup-plugin-esbuild')

const createScriptBuilder = (isProd, server) => async (file) => {
  const rollupInputOption = (file) => {
    return {
      input: `./src/script/${file}`,
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
        }),
        nodeResolve({ browser: true }),
        commonjs(),
        rollupJson(),
        isProd
          ? babel({ exclude: 'node_modules/**/*', babelHelpers: 'runtime' })
          : esbuild({ minify: false }),
        isProd && terser()
      ],
      context: 'window'
    }
  }
  const rollupOutputOption = (file) => {
    return {
      file: `./dist/js/${file}`,
      format: 'iife',
      name: 'library',
      sourcemap: true
    }
  }
  const bundle = await rollup(rollupInputOption(file))
  return bundle.write(rollupOutputOption(file))
}

exports.createScriptBuilder = createScriptBuilder
