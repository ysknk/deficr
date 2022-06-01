export const getDate = () => {
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

export const replaceTemplateLiteral = (template) => {
  const date = getDate()
  return template
    .replace(/%%yyyy%%/ig, date.yyyy)
    .replace(/%%yy%%/ig, date.yy)
    .replace(/%%mm%%/ig, date.mm)
    .replace(/%%m%%/ig, date.m)
    .replace(/%%dd%%/ig, date.dd)
    .replace(/%%d%%/ig, date.d)
}
