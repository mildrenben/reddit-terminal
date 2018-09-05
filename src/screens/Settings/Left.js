import React from 'react'
import styled from 'styled-components'

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
  { action: 'Get subreddit', keys: 'SUB TYPE TIME' },
  { action: 'New tab', keys: '⌘ + t'},
  { action: 'Kill tab', keys: '⌘ + k'},
  { action: 'Switch tab', keys: '⌘ + [0-9]'},
  { action: 'Clear screen', keys: 'ctrl + l'},
  { action: 'Previous/next commands', keys: 'up/down arrow'},
  { action: 'Focus command line', keys: '⌘ + alt'}
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
  
const Left = () => (
  <div>
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
  </div>
)
  
export default Left