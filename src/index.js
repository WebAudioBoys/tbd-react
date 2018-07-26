import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TopBar from './components/top-bar.jsx'
import Grid from './components/grid.jsx'
import {TabButton, TabButtons} from './components/tab-buttons.jsx'

// const initialState = {
//   playing: false,
//   channelToDisplay: 0,
//   currentTab: 0,
//   numInsts: 1,
//   tabs: [{tabName: '+', index: 0, classToggle: 'selected'  },{tabName: 'TBD', index: 1,classToggle: ''}],
//   instruments:[{
//     squares:
//
//     }],
//
// }

class TBD2 extends React.Component {
  constructor(props) {
    super(props);
    // set dimensions
    let empty = [];
    let containerH = 500
    let containerW = window.innerWidth - 50;
    let height = 500/props.rows;
    let width = Math.ceil(containerW-20)/(props.columns);
    containerW = 20+(width * props.columns);
    for (var i = 0; i < props.rows;i++){ empty.push([])
      for (var j = 0; j < props.columns; j++) {
        empty[i].push([]);
      }
    }
    this.state = {
      playing: false,
      channelToDisplay: 0,
      currentTab: 0,
      numInsts: 1,
      currentRow: '',
      currentColumn:'',
      lastCellLeft: '',
      twoCellsBack: '',
      mouseIsDown: false,
      startingColumn: '',
      columnChanged: '',
      reversing: false,
      endingColumn: '',
      tabs: [{tabName: '+', index: 0, classToggle: 'selected'  },{tabName: 'TBD', index: 1,classToggle: ''}],
      instruments:[{},{
        squares: empty,
        rows: props.rows,
        columns: props.columns,
        height: height,
        width:width,
        notes: [],
        containerW: containerW,
        containerH: containerH,
        }],

    }
    this.handleChange = this.handleChange.bind(this);
  }

handleClear(){
  console.log('clear');
}

handleChange(event) {
    let selected = event.target.value
    this.setState({
      channel: parseInt(selected.slice(-2)),
    });
  }

  handleForPlay(){
    let toggle = !this.state.playing
    this.setState({
      playing: toggle,
    })
  }

  addTab(){
    let currentTabs = this.state.tabs.slice();
    currentTabs.push({tabName: 'fucker', index: currentTabs.length, className: 'selected'  })
    this.setState({
      tabs: currentTabs,
    })
  }

  tabClick(ix){

    let currentTabs = this.state.tabs.slice();
    currentTabs[this.state.currentTab].classToggle ='';
    currentTabs[ix].classToggle='selected'
    this.setState({
      tabs:currentTabs,
      currentTab: ix,
    })
  }

  renderTabs(){
    let currentTabs = this.state.tabs.slice();
    console.log(currentTabs);
    let tabs = [];
    for (let i = 0; i < currentTabs.length; i++) {
      tabs.push(<TabButton tabName={currentTabs[i].tabName}
        index={currentTabs[i].index}
        tabName={currentTabs[i].tabName}
        classToggle={currentTabs[i].classToggle}
        tabClick={() => this.tabClick(i)}
        key={i}
      />)
  }
  return tabs;
}


  render() {
    let isPlaying = !this.state.playing ? 'topButton playing':'topButton';
    return (
      <div className="container">
          <TopBar
            channel={this.state.channelToDisplay}
            playing={this.state.playing}
            handleChange={this.handleChange}
            onPlayClick={() => this.handleForPlay()}
            handleClear={() => this.handleClear()}
            addTab={()=>this.addTab()}
          />
          <TabButtons className="tabButtons"
            tabs={this.renderTabs()}
          />

          <Grid rows="30" columns="32" />

        <div className="otherShit">
          <div className='howto'>
						<p><b>Click + Drag</b>...Create Note</p>
						<p><b>Alt + Click</b>...Trim/Extend Note</p>
						<p><b>Shift + Click</b>...Create Single Notes</p>
						<p><b>Backspace</b>...Delete Selected Note</p>
					</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
// WebMidi.enable(function (err) {
//   if(err){
//     console.log("Wib MIBI not working", err);
//   }
//   MIDI = WebMidi.outputs[0];
//   MIDI.playNote('C4');
//   console.log(WebMidi);
// });
//
//
// var clock = new Tone.Clock(function(time){
// 	MIDI.playNote('C4');
// }, 4);

// clock.start();


ReactDOM.render(
  <TBD2 />,
  document.getElementById('root')
);
