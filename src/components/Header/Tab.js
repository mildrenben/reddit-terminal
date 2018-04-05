import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import state from '../../store'
import styled from 'styled-components'
import v from '../../styles'

const Root = styled.div`
  padding: 0.25em 0.5em;
  flex-basis: 12rem;
  border-right: solid 1px ${v.greyBorder};
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  background: ${props => props.active ? v.lightGreyBackground : 'none'};
  cursor: pointer;
`

const TabNumber = styled.span``
  
class Tab extends React.Component {
  constructor(props) {
    super(props)
    this.removeTab = this.removeTab.bind(this)
    this.makeTabActive = this.makeTabActive.bind(this)
  }
  removeTab(e) {
    e.stopPropagation()
    console
    state.removeTab({ id: this.props.tab.id })
  }
  makeTabActive() {
    state.makeTabActive({ id: this.props.tab.id })
  }
  render() {
    const { tab, active } = this.props
    return (
      <Root active={active} onClick={this.makeTabActive}>
        <Button onClick={e => this.removeTab(e)}>✕</Button>
        {tab.name}
        <TabNumber>⌘ {tab.id + 1}</TabNumber>
      </Root>
    )
  }
}
  
Tab.propTypes = {
  tab: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }),
  active: PropTypes.bool.isRequired
}
  
export default Tab