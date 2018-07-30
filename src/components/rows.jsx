import React from 'react';

function styleSquares(cell){
  let s = 'square ';
  switch(cell){
    case "left":
      return s+'clicked left'

    case "right":
      return s+'clicked right'

    case "clicked":
      return s+'clicked'

    case '':
      return s

    case 'single':
      return s+'clicked left right'

    default:
      return s;
  }
}


function Square(props){
  return (
    //what is inside the state of the grid goes here
      <div className={styleSquares(props.cellStatus)}
        onMouseDown={props.onMouseDown}
        onMouseLeave={props.onMouseLeave}
        onMouseEnter={props.onMouseEnter}
        onMouseUp={props.onMouseUp}
        style={{height: props.height, width: props.width}}
        >{props.value}
      </div>
    );
  }

  function Label(props){
    return(
      <div className = {props.className}
        style={{height:props.height, width:props.width}}
        >
        {props.noteName}
      </div>
    )
  }

//Proto of each row
function Row(props){
      return (
        <div className={props.className}  style={{height: props.height, width: 'auto'}}>
          {props.value}
        </div>
      )
    }


  export {Row, Label, Square}
