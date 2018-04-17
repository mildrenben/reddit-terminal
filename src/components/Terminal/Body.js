import React from 'react'
import PropTypes from 'prop-types'
import Line from './Line'
import state from '../../store'
import getRandomInt from '../../utils/getRandomInt'
import { view } from 'react-easy-state'

const TERMINAL_LINE_LIMIT = 100

const FAKE_LINES_PRODUCED = 20
  
class Body extends React.Component {
  constructor(props) {
    super(props)
    this.incrementIdx = this.incrementIdx.bind(this)
    this.state = {
      idx: 0
    }
  }
  incrementIdx() {
    // Should clean this up and use weightedDice instead
    const rand = Math.random() * 100
    let time = 0
    if (rand < 85) {
      time = getRandomInt(0,30)
    } else if (rand >= 85 && rand < 97) {
      time = getRandomInt(30, 200)
    } else {
      time = getRandomInt(200, 800)
    }
    setTimeout(() => {
      const { lines } = this.props
      this.setState({ idx: this.state.idx + 1 })
      this.props.scrollBottom()
      if (lines.length > this.state.idx) {
        this.incrementIdx()
      } else {
        state.setLinesFinished()
      }
    }, time)
  }
  componentDidMount() {
    const { lines } = this.props
    // Did originally use a setInterval/clearInterval thing 
    // but you can't change the interval time whilst it's running
    const isLinesFinished = state.isLinesFinished()
    if (isLinesFinished) {
      this.setState({ idx: lines.length })
    } else {
      this.incrementIdx()
    }
  }
  componentWillReceiveProps(nextProps) {
    const { linesRead, lines } = nextProps
    this.setState({ idx: linesRead })
    setTimeout(this.props.scrollBottom, 0)
    if (linesRead !== lines.length) {
      this.incrementIdx()
    }
  }
  render() {
    const { lines, linesRead } = this.props
    const from = this.state.idx - TERMINAL_LINE_LIMIT 
    const trim = lines.slice(from < 0 ? 0 : from, this.state.idx)
    return trim.map((l, idx) => <Line {...l} key={`l-${idx}`} />)
  }
}
  
Body.propTypes = {
  activeTab: PropTypes.object.isRequired,
  scrollBottom: PropTypes.func.isRequired
}
  
export default view(Body)