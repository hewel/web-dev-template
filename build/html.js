const { src, dest } = require('gulp')
const { Liquid } = require('liquidjs')
const through = require('through2')
const { clone } = require('ramda')

const gulpLiquid = () => {
  const engine = new Liquid({ extname: '.liquid' })
  return through.obj((chunk, enc, callback) => {
    engine
      .parseAndRender(chunk.contents.toString())
      .then((res) => {
        const outputChunk = clone(chunk)
        outputChunk.contents = Buffer.from(res, 'utf-8')
        outputChunk.path = chunk.path.replace('.liquid', '.html')
        callback(null, outputChunk)
      })
      .catch((err) => {
        callback(err)
      })
  })
}

const createHtmlBuilder = (isProd, server) => {
  return src('src/html/**/*.liquid')
    .pipe(gulpLiquid())
    .pipe(dest('./dist/html'))
    .pipe(server.stream())
}

exports.createHtmlBuilder = createHtmlBuilder
