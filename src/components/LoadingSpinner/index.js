import React, { Component } from 'react'

const CHARS = ['|', '/', '-', '\\']

class LoadingSpinner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: 0
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      const { position } = this.state
      if (position === 3) {
        this.setState({ position: 0 })
      } else {
        this.setState({ position: position + 1 })
      }
    }, 150)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    console.log(this.state, CHARS, CHARS[this.state.position])
    return (
      <span>{CHARS[this.state.position]}</span>
    )
  }
}

export default LoadingSpinner