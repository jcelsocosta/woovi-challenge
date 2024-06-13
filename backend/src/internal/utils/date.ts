import momentTimezone from 'moment-timezone'

function dateNow(): any {
  return momentTimezone.tz(new Date(), "America/Sao_Paulo").format()
}

export { dateNow }