import React from 'react'
import Terminal from '../../components/Terminal'
import state from '../../store'
import { view } from 'react-easy-state'
import getFakeLines from '../../utils/fakes'
import snoowrap from 'snoowrap'
import c from '../../../config'

const r = new snoowrap({
  userAgent: '',
  clientId: c.clientId,
  clientSecret: c.clientSecret,
  refreshToken: c.refresh
})

class HomeScreen extends React.Component {
  componentDidMount() {
    async function getData() {
      const me = await r.getHot('coys')
      console.log(me)
    }
    getData()
    window.addEventListener('keydown', e => {
      if (e.metaKey && e.key === 't') {
        state.addTab()
      }
      if (e.metaKey && e.key === 'k') {
        state.removeTab({ id: state.ui.activeTab })
      }
      if (e.metaKey && !isNaN(e.key)) {
        state.makeTabActive({ id: e.key - 1 })
      }
      if (document.activeElement.id !== 'textInput') {
        if (e.key === 'a') {
          state.runFake({ type: 'webpack' })
        }
        if (e.key === 'f') {
          state.addNewLines({ lines: [] })
        }
      }
    })
  }
  render () {
    return (
      <Terminal />
    )
  }
}

export default view(HomeScreen)