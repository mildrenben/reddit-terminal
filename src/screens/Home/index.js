import React from 'react'
import Terminal from '../../components/Terminal'
import state from '../../store'
import { view } from 'react-easy-state'
import getFakeLines from '../../utils/fakes'

class HomeScreen extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      const a = document.activeElement
      
      if (e.metaKey && e.key === 't') {
        state.addTab()
      }
      if (e.metaKey && e.key === 'k') {
        state.removeTab({ id: state.ui.activeTab })
      }
      if (e.metaKey && !isNaN(e.key)) {
        state.makeTabActive({ id: e.key - 1 })
      }

      // Focus on page
      if (a.id !== 'textInput') {
        if (e.key === 'a') {
          state.runFake({ type: 'webpack' })
        }
        if (e.key === 'f') {
          state.addNewLines({ lines: [] })
        }
      }

      // Focus on textInput
      if (a.id === 'textInput') {
        if (e.key === 'Enter') {
          e.preventDefault()
          state.command({ message: e.target.textContent })
          e.target.textContent = ''
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