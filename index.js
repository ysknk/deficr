#!/usr/bin/env node

'use strict'

/* @author ysknk */

// TODO
// treeファイル化(options追加)

import { packageName, colors, convertTime } from './lib/utilities.js'
import {
  dist,
  rname,
  target,
  mode,

  zname,
  zopts,
  zinfo,

  gsha,
  gdroot
} from './lib/arguments.js'

import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'
import fse from 'fs-extra'

/*---
 *
 * vars
 *
 ---*/

const cwd = process.cwd()

const distPath = path.join(cwd, dist)
const deliveryPath = path.join(distPath, rname)

const rootPath = path.join(cwd, rname)

const execOptions = {
  stdio: 'inherit'
}
const rmOptions = {
  recursive: true,
  force: true
}

const hrtimes = []
hrtimes.push(process.hrtime())

const onSuccess = (string) => {
  hrtimes.push(process.hrtime())
  console.log(colors.brightGreen('success'), `${string} - ${convertTime(hrtimes[hrtimes.length - 1], 's').string}`)
}

/*---
 *
 * procs
 *
 ---*/
console.log('')
console.log(colors.blue('info'), packageName, 'Start')
console.log('')

if (mode === 'diff' && !gsha) {
  console.log(colors.magenta('error'), '[mode:diff] please set Git SHA option. [--gsha ***]')
  process.exit(1)
}

switch (mode) {
  case 'diff': {
    const targetDir = gdroot ? `="${gdroot}"` : ''
    const diff = `git diff --diff-filter=d --name-only --relative ${gsha} HEAD`

    const format = ` --format=zip`
    const prefix = ` --prefix=${zname}/`
    const cd = gdroot ? `cd ${gdroot} && ` : ''

    // NOTE: Create zip
    try {
      execSync(`${cd}git archive${format}${prefix} HEAD \`eval ${diff}\` -o ${zname}.zip`, execOptions)
      onSuccess(`Create ${zname}.zip`)
    } catch (e) {
      console.log(colors.magenta('error'), e)
      console.log('Do you manage with git?')
    }

    if (zinfo) {
      console.log('')
      execSync(`zipinfo ${zname}.zip`, execOptions)
    }
    break
  }

  default: {
    const zipcmd = `zip -r ${zname}.zip ${rname}/ ${zopts}`

    // NOTE: Copy from target to rname
    if (target) {
      fse.copySync(path.join(distPath, target), path.join(deliveryPath, target))
      onSuccess(`Copy ${dist}/${rname}/`)
    } else {
      fse.copySync(distPath, rootPath)
      onSuccess(`Copy ${rname}/`)
    }

    const proc = (d) => {
      const cd = d ? `cd ${dist}/ && ` : ''
      const distDir = d ? `${dist}/` : ''

      execSync(`${cd}${zipcmd}`)
      onSuccess(`Create ${distDir}${zname}.zip`)

      // NOTE: Delete duplicate directory
      fs.rmSync(path.join(cwd, `${distDir}${rname}/`), rmOptions)
      onSuccess(`Remove ${distDir}${rname}/`)

      if (zinfo) {
        console.log('')
        execSync(`${cd}zipinfo ${zname}.zip`, execOptions)
      }
    }

    // NOTE: Create zip
    proc(target ? dist : '')
    break
  }
}

console.log('')
console.log(colors.blue('info'), packageName, 'Finish')
console.log('')
