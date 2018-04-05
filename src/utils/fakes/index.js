import getFirstText from './getFirstText'
import getSecondText from './getSecondText'
import getRandomInt from '../getRandomInt'
import weightedDice from '../weightedDice'
import flipCoin from '../flipCoin'

function getFakeLines () {
  const rand = Array(getRandomInt(30,100))
  const lines = rand.fill('').map(i => {
    const line = { 
      number: getRandomInt(0,700),
      first: { text: getFirstText(), color: weightedDice([
        { thing: 'pure', weight: 95 }, 
        { thing: 'yellow', weight: 4 },
        { thing: 'red', weight: 1 }
      ]) },
      second: { text: getSecondText() },
    }
    if (flipCoin()) {
      line.third = { text: `{${flipCoin()}}` }
    }
    if (flipCoin()) {
      line.fourth = weightedDice([
        { thing: { text: '[built]', color: 'green' }, weight: 90 },
        { thing: { text: '[not cacheable]', color: 'red' }, weight: 10 }
      ])
    }
    return line
  })
  return lines
}

export default getFakeLines