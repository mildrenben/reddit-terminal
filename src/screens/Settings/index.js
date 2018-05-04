import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import v from '../../styles'

const Root = styled.div`
  padding: 1em 1.3em;
  width: 100%;
  height: calc(100vh - 24px);
  background: ${v.blackBackground};
  color: ${v.whiteText};
  overflow: auto;
  position: relative;
`

const BackButton = styled.div`
  position: absolute;
  top: 2em;
  right: 4em;
  font-size: 0.8em;
  & a {
    color: white;
  }
`

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`

const StyledItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 400px;
  font-family: 'Monaco', 'Andale Mono', 'Lucida Console', monospace;
  font-size: 0.8em;
  line-height: 170%;
`

const Item = ({ action, keys }) => (
  <StyledItem>
    <span>{action}</span>
    <span>{keys}</span>
  </StyledItem>
)

const COMMANDS = [
  { action: 'New tab', keys: '⌘ + t'},
  { action: 'Kill tab', keys: '⌘ + k'},
  { action: 'Switch tab', keys: '⌘ + [0-9]'},
  { action: 'Clear screen', keys: 'ctrl + l'},
  { action: 'Previous/next commands', keys: 'up/down arrow'},
  { action: 'Focus command line', keys: 'ctrl + alt'}
]

const SUBS = [
  'askreddit',
  'technology',
  'cryptocurrency',
  'business',
  'doesAnybodyElse',
  'TIFU',
  'truegaming',
  'javascript'
]

const Settings = () => (
  <Root>
    <BackButton><Link to='/'>Back to command line</Link></BackButton>
    <h2>Options</h2>
    <span>Coming soon...</span>
    <h2>Commands</h2>
    <List>
      { COMMANDS.map(cmd => <Item {...cmd} key={cmd.action} />) }
    </List>
    <h2>Good text heavy subs</h2>
    <List>
      { SUBS.map(sub => <StyledItem key={sub}>{sub}</StyledItem>) }
    </List>
  </Root>
)

export default Settings