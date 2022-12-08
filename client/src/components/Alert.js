import React from 'react'

const Alert = (props) => {
  return (
    <div class="alert alert-danger alert-dismissible fade show w-30 text-center" role="alert" style={ {position: "absolute" ,zIndex: "10000000000", right: 0, top: 180}}>
        <strong className='pr-3'>Alert</strong> {props.alert}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
  )
}

export default Alert