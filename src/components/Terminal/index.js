import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CommandLine from './CommandLine'
import Line from './Line'
import Body from './Body'
import getFakeLines from '../../utils/fakes'
import { view } from 'react-easy-state'
import state from '../../store'
import v from '../../styles'

const Root = styled.div`
  padding: 1em 1.3em;
  width: 100%;
  height: calc(100vh - 24px);
  background: ${v.blackBackground};
  color: ${v.whiteText};
  font-family: 'Monaco', 'Andale Mono', 'Lucida Console', monospace;
  font-size: 12px;
  box-sizing: border-box;
  overflow: auto;
`

class Terminal extends React.Component {
  constructor(props) {
    super(props)
    this.scrollBottom = this.scrollBottom.bind(this)
  }
  scrollBottom() {
    const { scrollHeight } = this.root
    this.root.scrollTop = scrollHeight
  }
  getActiveTab() {
    const { activeTab } = state.ui
    return state.ui.tabs[activeTab]
  }
  getLines() {
    const activeTab = this.getActiveTab()
    const lines = activeTab.lines
    return lines
  }
  render() {
    return (
      <Root innerRef={div => this.root = div}>
        <Body 
          lines={this.getLines()} 
          linesFinished={this.getActiveTab().linesFinished}
          scrollBottom={this.scrollBottom}
        />
        <Line first={{ text: '> press a to run all tests' }} />
        <Line first={{ text: '> press f to recompile' }} />
        <CommandLine />
      </Root>
    )
  }
}
  
Terminal.propTypes = {
  
}
  
export default view(Terminal)