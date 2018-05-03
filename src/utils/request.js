import snoowrap from 'snoowrap'
import state from '../store'
import c from '../../config'
import o from '../options'

const r = new snoowrap({
  userAgent: '',
  clientId: c.clientId,
  clientSecret: c.clientSecret,
  refreshToken: c.refresh
})

export async function getSub ({ sub, type, time }) {
  try {
    state.startLoading()
    const capitalisedType = type[0].toUpperCase() + type.slice(1)
    const options = {}
    if (time) options.time = time
    const data = await r[`get${capitalisedType}`](sub, options)
    state.stopLoading()
    return data
  } catch(e) {
    state.stopLoading()
  }
  
}

export async function getMoreSub ({ sub, type }) {
  try {
    state.startLoading()
    const data = await state.subs[sub][type].fetchMore({ amount: o.NEXT_AMOUNT })
    state.stopLoading()
    return data
  } catch (e) {
    state.stopLoading()
  }
}