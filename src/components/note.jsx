import React from 'react';

function Note(props){
  return(
    <div className={props.className}
      style={{width: props.width, left: props.position}}
      onMouseDown={props.onNoteClick}
      onMouseMove={props.onNoteMove}
      onMouseUp={props.onNoteRelease}
      >
    </div>
  )
}

export default Note
