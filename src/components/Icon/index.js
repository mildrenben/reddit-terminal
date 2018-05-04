import React from 'react'
import PropTypes from 'prop-types'
import settings from '../../assets/settings.svg'
import styled from 'styled-components'

const icons = {
  settings
}

const Icon = ({ name, width = '16px', height = '16px', color }) => (
  <svg width={width} height={height}>
    <use xlinkHref={`#${icons[name].id}`} fill={color} />
  </svg>
)
  
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string
}
  
export default Icon