import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import v from '../../styles'

const Root = styled.div`
  display: flex;
  align-items: stretch;
`

const Span = styled.span`
  position: relative;
  &:after {
    content: '';
    display: block;
    position: absolute;
    background: ${v.blackBackground};
    width: 1px;
    height: 100%;
    top: 0;
    right: 0;
  }

  &:focus {
    outline: none;    
  }
`

const blink = keyframes`
  0%, 49.99% {
    background: ${v.terminalCursor};
  }
  50%, 100% {
    background: none;
  }
`

const Cursor = styled.span`
  display: block;
  width: 0.45em;
  margin-left: 0.1em;
  background: ${v.terminalCursor};
  animation: ${blink} 1s linear infinite;
`
  
class CommandLine extends React.Component {
  constructor(props) {
    super(props)
    this.focusTextInput = this.focusTextInput.bind(this)
  }
  componentDidMount() {
    this.focusTextInput()
  }
  focusTextInput() {
    this.textInput.focus()
  }
  render() {
    return (
      <Root onClick={this.focusTextInput}>
        <Span contentEditable innerRef={span => this.textInput = span} id='textInput' />
        <Cursor />
      </Root>
    )
  }
}
  
CommandLine.propTypes = {
  
}
  
export default CommandLine