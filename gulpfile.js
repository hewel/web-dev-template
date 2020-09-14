const fs = require('fs').promises
const path = require('path')
const { zipObj, take } = require('ramda')

const cheerio = require('cheerio')

const browserSync = require('browser-sync')
const { parallel, series, watch, task } = require('gulp')

const { createStyleBuilder } = require('./build/style')
const { createHtmlBuilder } = require('./build/html')
const { createScriptBuilder } = require('./build/script')

require('dotenv-flow').config()

const isProd = process.env.NODE_ENV === 'production'
const server = browserSync.create('server')

const getJsFiles = async () =>
  (await fs.readdir(path.join(__dirname, './src/script'))).filter((file) => !/^_\w+\.js/.test(file))

const buildStyle = () => createStyleBuilder(isProd, server)
const buildHtml = () => createHtmlBuilder(isProd, server)

const buildScript = createScriptBuilder(isProd, server)
const buildAllScript = async () => {
  const files = await getJsFiles()
  return Promise.all(files.map(buildScript))
}

const watchScript = async (reload) => {
  const files = await getJsFiles()
  files.forEach((file) => {
    const fileName = file.replace('.js', '')
    const taskName = `build_${fileName}`
    task(taskName, (cb) => {
      buildScript(file).then(() => cb())
    })
    watch([`src/script/${file}`], { events: 'all' }, series(`build_${fileName}`, reload))
  })
  return
}

const serve = async () => {
  const htmlList = (await fs.readdir(path.join(__dirname, 'dist/html'))).filter((value) => {
    const regex = /^\w*\.html/
    return regex.test(value)
  })
  const routes = zipObj(
    htmlList.map((value) => {
      return '/' + take(value.match('.html').index, value)
    }),
    htmlList.map((value) => path.join(__dirname, 'dist/html', value))
  )
  server.init({
    server: {
      baseDir: './dist',
      routes: routes
    },
    middleware: [
      {
        route: '/',
        handle: async (req, res, next) => {
          const list = Object.keys(routes)
            .map(
              (value) =>
                `<li class="column is-2"><a class="button is-text" href="${value}">${value}</a></li>`
            )
            .join('')
          const dom = cheerio.load(
            `<body>
              <div class="notification">
                <div class="container">
                  <div class="box">
                    <ul class="columns is-multiline is-desktop">
                      ${list}
                    </ul>
                  </div>
                </div>
              </div>
            </body>`
          )
          dom('head').after(
            `<link crossorigin="anonymous" integrity="sha384-4em484va1axTOWEtQ2De+F+ZcQgGnWxvbINokKfnVZxyJZP5Iu0RzVqk6N29pMxQ" href="https://lib.baomitu.com/bulma/0.9.0/css/bulma.min.css" rel="stylesheet">`
          )
          res.setHeader('Content-Type', 'text/html')
          res.end(dom.html())
          next()
        }
      }
    ],
    ui: false,
    open: false
  })

  function reload(done) {
    server.reload()
    done()
  }
  watch(['src/**/*.liquid'], { events: 'all' }, buildHtml)
  watch(['src/**/*.?(sass|scss)', './tailwind.config.js'], { events: 'all' }, buildStyle)
  // watch(['src/script/**/*.js'], { events: 'all' }, series(buildAllScript, reload))
  await watchScript(reload)
}

const build = parallel(buildHtml, buildStyle, buildAllScript)

exports.buildStyle = buildStyle
exports.buildScript = buildAllScript
exports.buildHtml = buildHtml
exports.build = build
exports.dev = series(build, serve)
