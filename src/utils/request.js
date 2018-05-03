import snoowrap from 'snoowrap'
import state from '../store'
import c from '../../config'

const r = new snoowrap({
  userAgent: '',
  clientId: c.clientId,
  clientSecret: c.clientSecret,
  refreshToken: c.refresh
})

export async function getSub ({ sub, type, time }) {
  const capitalisedType = type[0].toUpperCase() + type.slice(1)
  const options = {}
  if (time) options.time = time
  const data = await r[`get${capitalisedType}`](sub, options)
  return data
}

export async function getMoreSub ({ sub, type }) {
  const data = await state.subs[sub][type].fetchMore({ amount: 10 })
  return data
}