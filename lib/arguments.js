import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import utils from 'node-package-utilities'
import { replaceTemplateLiteral } from './utilities.js'

export const packageName = 'deficr'

export const config = await utils.value.fromConfig(packageName)

const argv = yargs(hideBin(process.argv))
  .config(config || {})
  .option('dist', {
    alias: 'd',
    describe: 'dist directory',
    default: 'dist',
    demandOption: true
  })
  .option('mode', {
    alias: 'm',
    describe: 'delivery file mode [all|diff]',
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

export const dist = argv.dist

export const mode = argv.mode
export const rname = replaceTemplateLiteral(argv.rootname)

export const target = argv.target

export const zipname = argv.zipname
  ? replaceTemplateLiteral(argv.zipname)
  : rname
export const zname = zipname
export const zopts = argv.zipoptions
export const zinfo = argv.zipinfo

export const gsha = argv.gitsha
export const gdroot = argv.gitdiffroot

