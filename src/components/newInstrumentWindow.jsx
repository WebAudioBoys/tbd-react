import React from 'react';

function NewInstrumentWindow(props){
  return(
    <form>
    <div className='newInst'>
    <div id="topbar">
      Add another instrument!
    </div>
      <input type="text" id="insName"  onChange={props.instName} placeholder='Name the instrument'>
      </input>
      <div className="preset-extras">How many notes?</div>
            <input type="number" id ="rowCount" step="1" min="1" max="128" onChange={props.countRows}></input>


      <div className="modal-footer inst">
          <button className="newInsButton" onMouseDown={props.newInstClick}>Let's play!</button>
          <button className="cancel btn btn-default" type="button" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </form>


  )
}

export default NewInstrumentWindow
