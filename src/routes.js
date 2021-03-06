import React from 'react'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import Home from './screens/Home'
import Settings from './screens/Settings'
import Header from './components/Header'
import { hot } from 'react-hot-loader'
import './styles/global'

const Routes = () => (
  <BrowserRouter>
    <div style={{maxHeight: '100vh', overflow: 'hidden'}}>
     { window.location.pathname.includes('index.html') && <Redirect to='/' /> }
      <Header />
      <Route exact path='/' component={Home} />
      <Route exact path='/settings' component={Settings} />
    </div>
  </BrowserRouter>
)

export default hot(module)(Routes)