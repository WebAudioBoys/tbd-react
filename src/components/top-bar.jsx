import React from 'react';

const QUANTS = ["No Quantization","1/4 Note","1/8th Note","1/16th Note","1/4 triplet","1/8 triplet","1/16 triplet"]
const SUBDIVS = [0,4,8,16,6,12,24];
function TopBar(props){
    let isPlaying = props.playing ? 'topButton playing':'topButton';
    return(
  <div className="topBar">
  <div className="bold_text"> tbd 2</div>
  <div className="buttons">
    <TopButton
      class = {isPlaying}
      text="Play"
      onMouseDown={props.onPlayClick}
      ix={0}
    />
    <TopButton
      text="Clear"
      class={"topButton"}
      onMouseDown={props.handleClear}
      ix={1}
    />
    <TopButton
      text="AddTab"
      class={"topButton"}
      onMouseDown={props.addTab}
      ix={2}
    />
    <TopButton
      text="Zoom In"
      class={"topButton"}
      onMouseDown={props.zoomIn}
      ix={2}
    />
    <TopButton
      text="Zoom Out"
      class={"topButton"}
      onMouseDown={props.zoomOut}
      ix={2}
    />

    <ChannelDropdown
      onChange={props.handleChange}
      channel={props.channel}
    />
    <QuantDropdown
      onQuantChange={props.quantChange}

    />
   </div>
</div>
  )
}


function TopButton(props){
  return (
    //what is inside the state of the grid goes here
      <button
        className={props.class}
        onMouseDown={props.onMouseDown}
        ix={props.ix}
        >{props.text}
      </button>
    );

}

function QuantDropdown(props){
  let options = [];
  for(let i = 0; i < QUANTS.length; i++){
    options.push(<option key={i} val={SUBDIVS[i]}>{QUANTS[i]}</option>);
  }
  return(
    <select
    quant={props.quant}
    className="topButton quant"
    onChange={props.onQuantChange}
    >
    {options}
  </select>
)
}

function ChannelDropdown(props){
  let options = []
  for(let i=0;i<16;i++){
    options.push(<option key={i+1}>{"Channel "+(i+1)}</option>);
  }

  return(
    <select
      id="output"
      channel={props.channel}
      className="topButton"
      onChange={props.onChange}
      >
      <option key={0}>Select A Channel</option>
      {options}
    </select>
  )
}




export default TopBar
