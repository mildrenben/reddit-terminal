import getRandomInt from '../getRandomInt'

const dirs = [
  './node_modules',
  './node_modules',
  './src',
  './renderer',
  '(webpack)-hot-middleware',
  'babel-polyfill',
  './test',
  'babel'
]

const second = [
  'core-js',
  'strip-ansi',
  'react',
  'react-dom',
  'routes',
  'babel-polyfill',
  'build',
  'regenerator-runtime',
  'client',
  'process',
  'dist',
  'module',
]

const last = [
  'index',
  'routes',
  'shim',
  'client?path=http://localhost:8000/__webpack_hmr',
  'runtime',
  'escape',
  'client-overlay',
  'process-update',
]


function getFirstText () {
  let str = dirs[getRandomInt(0, dirs.length)]
  if (Math.random() > 0.5) {
    str = `${str}/${second[getRandomInt(0, second.length)]}`
  }
  if (Math.random() > 0.25) {
    str = `${str}/${last[getRandomInt(0, last.length)]}`
  }
  return str + '.js'
}

export default getFirstText