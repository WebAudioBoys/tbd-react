import React from 'react';

function GridContainer(props){
  return(
    <div className={props.className}
      style={{height: props.height, width: props.width}}
      onMouseLeave={props.onGridLeave}
      >
        {props.grid}
    </div>
  )
}

//Creates the Grid
function Grid(props) {
    return (
      <GridContainer
        key={"1"}
        grid ={props.createGrid}
        className={props.containerClass}
        height={props.containerH}
        width={props.containerW}
        
      />
    );
}

export default Grid
