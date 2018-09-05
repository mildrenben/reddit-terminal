import snoowrap from 'snoowrap'
import state from '../store'
import c from '../../config'
import o from '../options'

const r = new snoowrap({
  userAgent: '',
  clientId: c.clientId,
  clientSecret: c.clientSecret,
  refreshToken: c.refreshToken,
})

export async function getSub ({ sub, type = 'hot', time }) {
  try {
    state.startLoading()
    const capitalisedType = type[0].toUpperCase() + type.slice(1)
    const options = {}
    if (time) options.time = time
    const data = await r[`get${capitalisedType}`](sub, options)
    state.stopLoading()
    return data
  } catch(e) {
    console.error(e)
    state.stopLoading()
  }
}

export async function getNextSub ({ sub, type = 'hot'}) {
  try {
    state.startLoading()
    const data = await state.subs[sub][type].listing.fetchMore({ amount: o.NEXT_AMOUNT })
    state.stopLoading()
    return data
  } catch (e) {
    console.error(e)
    state.stopLoading()
  }
}

export async function getComments ({ id }) {
  try {
    state.startLoading()
    const submission = await r.getSubmission('8gtrtf')
    const comments = await submission.comments.fetchAll()
    state.stopLoading()
    return comments
  } catch(e) {
    console.error(e)
    state.stopLoading()
  }
}