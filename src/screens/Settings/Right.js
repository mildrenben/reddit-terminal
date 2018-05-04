import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import v from '../../styles'

// I am aware of how bad Left and Right is for
// naming components

// I am also aware these shouldn't really sit in this folder.
// I feel like I made a mistake making a screens dir, but I wanted to
// try it out and now I know not to do it. Maybe I'll refactor
// one day but it's unlikely

const Root = styled.div`
  margin-left: 5em;
  padding-top: 1em;
`

const BackButton = styled.div`
  & a {
    color: ${v.pureText};
    font-size: 0.8em;
  }
`

const StyledLink = styled.a`
  color: ${v.terminalCursor};
  font-size: 0.8em;
  display: block;
`

const Twitter = StyledLink.extend`
  margin-top: 3em;
`

const Right = () => (
  <Root>
    <BackButton><Link to='/'>Back to command line</Link></BackButton>
    <h3>Github</h3>
    <StyledLink href='https://github.com/mildrenben/reddit-terminal'>Reddit Terminal</StyledLink>
    <Twitter href='https://twitter.com/mildrenben'>@mildrenben</Twitter>
  </Root>
)
  
export default Right