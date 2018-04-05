import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CommandLine from './CommandLine'
import Line from './Line'
import Body from './Body'
import getFirstText from '../../utils/fakes/getFirstText'
import getSecondText from '../../utils/fakes/getSecondText'
import getRandomInt from '../../utils/getRandomInt'
import weightedDice from '../../utils/weightedDice'
import flipCoin from '../../utils/flipCoin'
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
  render() {
    const rand = Array(getRandomInt(500,501))
    const lines = rand.fill('').map(i => {
      const line = { 
        number: getRandomInt(0,700),
        first: { text: getFirstText(), color: weightedDice([
          { thing: 'pure', weight: 95 }, 
          { thing: 'yellow', weight: 4 },
          { thing: 'red', weight: 1 }
        ]) },
        second: { text: getSecondText() },
      }
      if (flipCoin()) {
        line.third = { text: `{${flipCoin()}}` }
      }
      if (flipCoin()) {
        line.fourth = weightedDice([
          { thing: { text: '[built]', color: 'green' }, weight: 90 },
          { thing: { text: '[not cacheable]', color: 'red' }, weight: 10 }
        ])
      }
      return line
    })
    return (
      <Root innerRef={div => this.root = div}>
        <Body lines={lines} scrollBottom={this.scrollBottom} />
        <Line first={{ text: '> press a to run all tests' }} />
        <Line first={{ text: '> press f to recompile' }} />
        <CommandLine />
      </Root>
    )
  }
}
  
Terminal.propTypes = {
  
}
  
export default Terminal