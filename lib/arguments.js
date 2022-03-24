import findUp from 'find-up'

import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

import fs from 'fs'
import { replaceTemplateLiteral } from `./utilities`

const configPath = findUp.sync(['.deficrrc', '.deficrrc.json', '.deficrrc.js'])
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {}

const argv = yargs(hideBin(process.argv))
  .config(config)
  .option('dist', {
    alias: 'd',
    describe: 'dist directory',
    default: 'dist',
    demandOption: true
  })
  .option('mode', {
    alias: 'm',
    describe: 'delivery file mode [all or diff]',
    default: 'all',
    demandOption: true
  })
  .option('rootname', {
    alias: 'rname',
    describe: 'set root directory name',
    default: '%%yy%%%%mm%%%%dd%%',
    demandOption: true
  })
  .option('target', {
    alias: 't',
    describe: 'zip target',
    default: '',
    demandOption: false
  })

  .option('zipname', {
    alias: 'zname',
    describe: 'set zip name',
    default: '',
    demandOption: false
  })
  .option('zipoptions', {
    alias: 'zopts',
    describe: 'set zip options',
    default: '-x "*.DS_Store" "*__MACOSX*"',
    demandOption: false
  })
  .option('zipinfo', {
    alias: 'zinfo',
    describe: 'show zip info',
    default: false,
    demandOption: false
  })

  .option('gitsha', {
    alias: 'gsha',
    describe: 'git commit hash',
    default: '',
    demandOption: false
  })
  .option('gitdiffroot', {
    alias: 'gdroot',
    describe: 'example "a/b"',
    default: '',
    demandOption: false
  })

  .argv

const cwd = process.cwd()

exports.dist = argv.dist

exports.mode = argv.mode
const rootname = replaceTemplateLiteral(argv.rootname)
exports.rname = rootname

exports.target = argv.target

const zipname = argv.zipname
  ? replaceTemplateLiteral(argv.zipname)
  : rootname
exports.zname = zipname
exports.zopts = argv.zipoptions
exports.zinfo = argv.zipinfo

exports.gsha = argv.gitsha
exports.gdroot = argv.gitdiffroot

