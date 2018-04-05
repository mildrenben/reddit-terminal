import React from 'react'
import state from '../../store'
import Terminal from '../../components/Terminal'

let textInput = null

class HomeScreen extends React.Component {
  componentDidMount() {
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
        }
        if (e.key === 'f') {

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

export default HomeScreen