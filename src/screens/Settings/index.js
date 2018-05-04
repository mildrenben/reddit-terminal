import React from 'react'
import styled from 'styled-components'
import Left from './Left'
import Right from './Right'
import v from '../../styles'

const Root = styled.div`
  padding: 1em 1.3em;
  width: 100%;
  height: calc(100vh - 24px);
  background: ${v.blackBackground};
  color: ${v.whiteText};
  display: flex;
`

const Settings = () => (
  <Root>
    <Left />
    <Right />
  </Root>
)

export default Settings