const convertHrtime = (hrtime) => {
  const ns = hrtime
  const number = Number(ns)
  const ms = number / 1000000
  const s = number / 1000000000
  return {
    s,
    ms,
    ns
  }
}

const getDate = () => {
  const date = new Date()

  const yyyy = date.getFullYear().toString()
  const yy = yyyy.substr(2)

  const m = (date.getMonth() + 1).toString()
  const mm = m.padStart(2, '0')

  const d = (date.getDate()).toString()
  const dd = d.padStart(2, '0')

  return {
    yyyy,
    yy,
    m,
    mm,
    d,
    dd
  }
}

const cReset = '\u001b[0m'
exports.cReset = cReset

const color = (code) => {
  return (str) => {
    return `\u001b[${code}m${str}${cReset}`
  }
}
exports.colors = {
  red: color('31'),
  magenta: color('35'),
  cyan: color('36'),
  blue: color('34'),
  brightBlue: color('96'),
  brightGreen: color('92')
}

exports.convertHrtime = convertHrtime

exports.convertTime = (hrtime, unit) => {
  const time = convertHrtime(hrtime[1])[unit]
  return {
    origin: time,
    fixed: time.toFixed(3),
    string: `${time.toFixed(3)}s`
  }
}

exports.getDate = getDate()

exports.replaceTemplateLiteral = (template) => {
  const date = getDate()
  return template
    .replace(/%%yyyy%%/ig, date.yyyy)
    .replace(/%%yy%%/ig, date.yy)
    .replace(/%%mm%%/ig, date.mm)
    .replace(/%%m%%/ig, date.m)
    .replace(/%%dd%%/ig, date.dd)
    .replace(/%%d%%/ig, date.d)
}
