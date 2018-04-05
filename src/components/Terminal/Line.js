import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import v from '../../styles'

const Root = styled.p`
  margin: 0 0 0.2em;
  padding: 0;
`

const Num = styled.span`
  display: inline-block;
  margin-right: 1em;
  margin-left: ${props => props.padLeft && props.padLeft + 'em'};
  color: ${v.whiteText}
`

const Text = styled.span`
  color: ${props => v[props.color + 'Text']};
  margin-right: 1em;
  display: inline-block;
`

const COLORS = ['pure', 'white', 'yellow', 'red', 'blue']

class Line extends React.Component {
  render() {
    const { number, first, second, third, fourth, fifth } = this.props
    const ORDER = [first, second, third, fourth, fifth]
    // I tried using padStart but React does not render
    // empty space at the start of a string :(
    const numPadLeft = (3 - String(number).length) * 0.6
    return (
      <Root>
        { number && 
          <Num padLeft={numPadLeft}>{`[${number}]`}</Num> 
        }
        {
          Array(5).fill('').map((i, idx) => {
            const elem = ORDER[idx]
            if (!elem) return null
            return (
              <Text 
                color={(elem && elem.color) || COLORS[idx]}
                key={`text-${idx}`}
              >
                {elem && elem.text}
              </Text>
            )
          })
        }
      </Root>
    )
  }
}

const shape = {
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['pure', 'white', 'yellow', 'red', 'blue', 'green'])
}

Line.propTypes = {
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  first: PropTypes.shape(shape),
  second: PropTypes.shape(shape),
  third: PropTypes.shape(shape),
  fourth: PropTypes.shape(shape),
  fifth: PropTypes.shape(shape),
}
  
export default Line