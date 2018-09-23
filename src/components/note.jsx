import React from 'react';

function Note(props){
  return(
    <div className={props.className}
      style={{width: props.width, left: props.position}}>
    </div>
  )
}

export default Note
