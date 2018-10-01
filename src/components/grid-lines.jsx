import React from 'react';

function GridLines(props){
  return(
    <div className={props.className}
      style = {{height:props.height, width:props.width, left:props.left}}
      ></div>
  )
}








export default GridLines
