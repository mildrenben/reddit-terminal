import React from 'react'
import Terminal from '../../components/Terminal'
import state from '../../store'
import { view } from 'react-easy-state'
import getFakeLines from '../../utils/fakes'
import o from '../../options'

class HomeScreen extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      const a = document.activeElement
      const textInput = document.getElementById('textInput')

      // Tab system
      if (e.metaKey && e.key === 't') {
        state.addTab()
      }
      if (e.metaKey && e.key === 'k') {
        state.removeTab({ id: state.ui.activeTab })
      }
      if (e.metaKey && !isNaN(e.key)) {
        state.makeTabActive({ id: e.key - 1 })
      }

      // Clear screen
      if (e.ctrlKey && e.key === 'l') {
        state.getActiveTab().lines = []
      }

      // Arrows up and down for cmd line
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        const pos = state.ui.cmdArrowPosition
        if (
          (pos === o.COMMAND_LINE_HISTORY_LENGTH && e.key === 'ArrowUp') || 
          (pos === state.cmd.length && e.key === 'ArrowUp') || 
          (pos === 0 && e.key === 'ArrowDown')
        ) {
          return
        } else {
          state.ui.cmdArrowPosition = e.key === 'ArrowUp'
            ? pos + 1
            : pos - 1
          textInput.textContent = state.cmd[state.ui.cmdArrowPosition - 1] || ''
        }
      }

      // Focus on page
      if (a.id !== 'textInput') {
        if (e.metaKey && e.altKey) {
          textInput.focus()
        }
        if (e.key === 'a') {
          state.runFake({ type: 'webpack' })
        }
        if (e.key === 'f') {
          state.addNewLines({ lines: [] })
        }
      }

      // Focus on textInput
      if (a.id === 'textInput') {
        if (e.metaKey && e.altKey) {
          textInput.blur()
        }
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