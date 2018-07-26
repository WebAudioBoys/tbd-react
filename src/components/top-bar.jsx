import React from 'react';
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

    <ChannelDropdown
      onChange={props.handleChange}
      channel={props.channel}
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
