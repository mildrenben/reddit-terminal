// Takes an array in shape: 
// [{ thing: 'heads', weight: 95 }, { thing: 'tails', weight: 5 }]
// thing can be anthing, ie object or func etc.
// weights must equal 100

function weightedDice (things) {
  const rand = Math.round(Math.random() * 100)
  let cumulative = 0
  const properWeightThings = things.map(t => {
    cumulative = cumulative + t.weight
    return { thing: t.thing, weight: cumulative }
  })
  let ans = null
  let i = 0
  while (!ans) {
    const { thing, weight } = properWeightThings[i]
    if (rand <= weight) {
      ans = thing
    }
    i++
  }
  return ans
}

export default weightedDice