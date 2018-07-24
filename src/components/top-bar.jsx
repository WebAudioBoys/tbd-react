import React from 'react';
// import ReactDOM from 'react-dom';


class TopBar extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      playing: true,
      channel: 0,
    }

    this.handleChange = this.handleChange.bind(this);
    }

  handleForPlay(){
    let toggle = !this.state.playing
    this.setState({
      playing: toggle,
    })
  }

  handleClear(){
    console.log('Clear')
  }

  handleChange(event) {
    let selected = event.target.value

    this.setState({
      channel: parseInt(selected.slice(-2)),
    });
  }

  render(){
    let isPlaying = !this.state.playing ? 'topButton playing':'topButton';
    return(
  <div className="topBar">
  <div className="bold_text"> tbd 2</div>
  <div className="buttons">
    <TopButton
      class = {isPlaying}
      text="Play"
      onMouseDown={() => this.handleForPlay()}
      ix={0}
    />
    <TopButton
      text="Clear"
      class={"topButton"}
      onMouseDown={() => this.handleClear()}
      ix={1}
    />
    <ChannelDropdown
      onChange={this.handleChange}
      channel={this.state.channel}
    />
   </div>
</div>
  )
}
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
