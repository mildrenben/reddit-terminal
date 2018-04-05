import React from 'react'
import PropTypes from 'prop-types'
import Line from './Line'
import getRandomInt from '../../utils/getRandomInt'

const LINE_LIMIT = 100
  
class Body extends React.Component {
  constructor(props) {
    super(props)
    this.incrementIdx = this.incrementIdx.bind(this)
    this.state = {
      idx: 0
    }
  }
  incrementIdx() {
    const rand = Math.random() * 100 // 0-100
    let time = 0
    if (rand < 85) {
      time = getRandomInt(0,30)
    } else if (rand >= 85 && rand < 97) {
      time = getRandomInt(30, 200)
    } else {
      time = getRandomInt(200, 800)
    }
    setTimeout(() => {
      this.setState({ idx: this.state.idx + 1 })
      this.props.scrollBottom()
      if (this.props.lines.length > this.state.idx) {
        this.incrementIdx()
      }
    }, time)
  }
  componentDidMount() {
    // Did originally use a setInterval/clearInterval thing 
    // but you can't change the interval time whilst it's running
    this.incrementIdx()
  }
  render() {
    const { lines } = this.props
    const from = this.state.idx - LINE_LIMIT 
    const trim = lines.slice(from < 0 ? 0 : from, this.state.idx)
    return trim.map((l, idx) => <Line {...l} key={`l-${idx}`} />)
  }
}
  
Body.propTypes = {
  lines: PropTypes.array.isRequired,
  scrollBottom: PropTypes.func.isRequired
}
  
export default Body