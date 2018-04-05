import getRandomInt from '../getRandomInt'
import weightedDice from '../weightedDice'

function getSecondText () {
  const size = weightedDice([
    { thing: 'bytes', weight: 65 },
    { thing: 'kB', weight: 25 },
    { thing: 'MB', weight: 10 }
  ])
  const rand = Math.round(getRandomInt(0, 1000))
  const randDecimal = Math.round(getRandomInt(0,99))
  let text = ''
  switch (size) {
    case 'bytes':
      text = `${rand} ${size}`
    case 'kB':
    case 'MB':
      text = `${rand}.${randDecimal} ${size}`
  }
  return text
}

export default getSecondText