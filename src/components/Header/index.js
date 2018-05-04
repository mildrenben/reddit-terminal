import React from 'react'
import Tab from './Tab'
import Button from '../Button'
import v from '../../styles'
import styled from 'styled-components'
import { view } from 'react-easy-state'
import Icon from '../../components/Icon'
import { Link } from 'react-router-dom'
import state from '../../store'

const SHeader = styled.header`
  height: 24px;
  font-size: 12px;
  background: ${v.greyBackground};
  display: flex;
  align-items: center;
  border-top: solid 1px ${v.greyBorder};
  border-bottom: solid 1px ${v.greyBorder};
`

const AddButton = Button.extend`
  margin-left: 0.2em;
`

const IconWrap = styled.div`
  margin-left: auto;
  margin-right: 1em;
`

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.addTab = this.addTab.bind(this)
  }

  addTab() {
    state.addTab()
  }

  render() {
    return (
      <SHeader>
        {state.ui.tabs.map(tab => 
          <Tab tab={tab} key={`tab-${tab.id}`} active={tab.id === state.ui.activeTab} />
        )}
        <AddButton onClick={this.addTab}>＋</AddButton>
        <IconWrap>
          <Link to='/settings'>
            <Icon name='settings' color={v.greyText} width={'14px'} height={'14px'} />
          </Link>
        </IconWrap>
      </SHeader>
    )
  }
}
  
export default view(Header)