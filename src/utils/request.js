import snoowrap from 'snoowrap'
import c from '../../config'

const r = new snoowrap({
  userAgent: '',
  clientId: c.clientId,
  clientSecret: c.clientSecret,
  refreshToken: c.refresh
})

export default async function getData ({ sub, type, time }) {
  const capitalisedType = type[0].toUpperCase() + type.slice(1)
  const options = {}
  if (time) options.time = time
  const data = await r[`get${capitalisedType}`](sub, options)
  const trimmedData = await data.map(d => ({
      domain: d.domain,
      downs: d.downs,
      id: d.id,
      name: d.name,
      commentsAmount: d.num_comments,
      nsfw: d.over_18,
      permalink: d.permalink,
      selftext: d.selftext,
      stickied: d.stickied,
      title: d.title,
      ups: d.ups,
      url: d.url
    })
  )
  return data
}