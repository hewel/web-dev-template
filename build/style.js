const { src, dest } = require('gulp')

const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const sass = require('gulp-sass')
// postcss plugins
const postcssPresetEnv = require('postcss-preset-env')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const tailwindcss = require('tailwindcss')
const Fiber = require('fibers')

sass.compiler = require('sass')

const createStyleBuilder = (isProd, server) => {
  const postcssPlugins = [
    postcssPresetEnv({ stage: 0 }),
    tailwindcss,
    isProd && autoprefixer(),
    isProd &&
      cssnano({
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      })
  ].filter((plugin) => plugin)
  return src(['src/style/**/*.?(sass|scss)', '!src/style/**/_*.?(sass|scss)'])
    .pipe(sourcemaps.init())
    .pipe(sass({ fiber: Fiber }).on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.mapSources((sourcePath) => '../../src/style/' + sourcePath))
    .pipe(sourcemaps.write(''))
    .pipe(dest('./dist/css'))
    .pipe(server.stream())
}

exports.createStyleBuilder = createStyleBuilder
