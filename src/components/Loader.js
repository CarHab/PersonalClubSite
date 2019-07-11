import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const Loader = props => {
  return (
    <div
      style={{
        display: 'flex',
        height: props.height,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress size={props.size} />
    </div>
  )
}

export default Loader
