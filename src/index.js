import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TopBar from './components/top-bar.jsx'
import Grid from './components/grid.jsx'
import {TabButton, TabButtons} from './components/tab-buttons.jsx'
import {Row, Label, Square} from './components/rows.jsx'
import NewInstrumentWindow from './components/newInstrumentWindow.jsx'

const NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B',];

function createEmptygrid(rows){
  let empty = [];
  for (var i = 0; i < rows;i++){
    empty.push([]);
    for (var j = 0; j < 32; j++) {
      empty[i].push([]);
    }
  }
  return empty;
}

class TBD2 extends React.Component {
  constructor(props) {
    super(props);
    // set dimensions
    let empty = [];
    let containerH = 500
    let containerW = window.innerWidth - 50;

    this.state = {
      playing: false,
      channelToDisplay: 0,
      currentTab: 1,
      currentRow: '',
      containerClass: 'gridContainer',
      currentColumn:'',
      lastCellLeft: '',
      twoCellsBack: '',
      mouseIsDown: false,
      startingColumn: '',
      columnChanged: '',
      reversing: false,
      newInst:{name: '', rows: ''},
      containerW: containerW,
      containerH: containerH,
      endingColumn: '',
      tabs: [{tabName: '+', index: 0, classToggle: ''  },{tabName: 'TBD', index: 1,classToggle: 'selected'}],
      instruments:[{

      },{
        squares: [],
        rows: 50,
        columns: 32,
        height: '',
        width:'',
        notes: [],
        }],
    }

    // for(let i = 1; i<this.state.instruments.length;i++){
    let currentInst = this.state.instruments[1];
    currentInst.height = 500/30;
    currentInst.width = Math.ceil(containerW-20)/(currentInst.columns);
    for (var i = 0; i < currentInst.rows;i++){
      empty.push([]);
      for (var j = 0; j < currentInst.columns; j++) {
        empty[i].push([]);
      }
    }
    currentInst.squares = empty;
    this.state.instruments[1] = currentInst;


    this.handleChange = this.handleChange.bind(this);
    this.instName = this.instName.bind(this);
    this.countRows = this.countRows.bind(this);
  }

instName(e){
  this.setState({
    newInst: {name: e.target.value, rows: this.state.newInst.rows},
  })
}

countRows(e){
  this.setState({
    newInst: {name: this.state.newInst.name, rows: e.target.value},
  })
}

handleClear(){
  let insts = this.state.instruments.slice();
  let currentInst = insts[this.state.currentTab]
  let empty = [];
  for (var i = 0; i < currentInst.rows;i++){
    empty.push([]);
    for (var j = 0; j < currentInst.columns; j++) {
      empty[i].push([]);
    }
  }
currentInst.squares = empty;
currentInst.notes = [];
insts[this.state.currentTab]=currentInst;
  this.setState({
    instruments: insts,
  })

}

handleChange(event) {
    let selected = event.target.value
    this.setState({
      channel: Number(selected.slice(-2)),
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
    currentTabs.push({tabName: 'fucker', index: currentTabs.length, classToggle: 'selected'  })
    this.setState({
      tabs: currentTabs,
    })
  }

  newInstClick(){
    let insts = this.state.instruments.slice();
    let newIx = insts.length;
    let newInst ={
        squares: createEmptygrid(this.state.newInst.rows),
        rows: this.state.newInst.rows,
        columns: 32,
        height: 500/this.state.newInst.rows,
        width:Math.ceil(this.state.containerW-20)/(32),
        notes: [],
        }
    insts.push(newInst);
    let currentTabs = this.state.tabs.slice();
    currentTabs.push({tabName: this.state.newInst.name, index: currentTabs.length, classToggle: 'selected'  })
    this.setState({
      tabs: currentTabs,
      instruments: insts,
      currentTab: newIx,
    })

  }

  tabClick(ix){
    let currentTabs = this.state.tabs.slice();
    let contClass = ix === 0 ? 'gridContainer newIns': 'gridContainer';
    currentTabs[this.state.currentTab].classToggle ='';
    currentTabs[ix].classToggle='selected'
    this.setState({
      tabs:currentTabs,
      currentTab: ix,
      containerClass: contClass,
    })
  }

  renderTabs(){
    let currentTabs = this.state.tabs.slice();
    let tabs = [];
    for (let i = 0; i < currentTabs.length; i++) {
      tabs.push(<TabButton tabName={currentTabs[i].tabName}
        index={currentTabs[i].index}
        classToggle={currentTabs[i].classToggle}
        tabClick={() => this.tabClick(i)}
        key={i}
      />)
  }
  return tabs;
}


handleClick(i,j,clickType) {
  let insts = this.state.instruments.slice();
  let currentInst = insts[this.state.currentTab]
  let squares = currentInst.squares.slice();
  let notes = currentInst.notes.slice();
  switch(clickType){
    case 'down':
      squares[i][j] = squares[i][j] === 'clicked'? '' : 'clicked';
      this.setState({
        currentRow:i,
        squares:squares,
        mouseIsDown:true,
        currentColumn: j,
        startingColumn: j,
      })
      break;

    case 'leave':
      if(this.state.mouseIsDown){
        if(this.state.lastCellLeft !== '' && this.state.columnChanged){
          this.setState({
            twoCellsBack: this.state.lastCellLeft
          })
        }

        this.setState({
          lastCellLeft: j,
        })

      }
      break;
    case 'enter':
      if(this.state.mouseIsDown){
        let columnChanged = this.state.currentColumn === j ? false : true;
        this.setState({
          columnChanged: columnChanged,
          currentColumn: j,
        })
        if(columnChanged){
        squares[this.state.currentRow][j] = squares[this.state.currentRow][j] === 'clicked'? '' : 'clicked';
          if(this.state.twoCellsBack === this.state.currentColumn){
            this.setState({
              reversing: true,
            })
            squares[this.state.currentRow][this.state.lastCellLeft] = '';

          }
        }
      }
      break;
    case 'up':
      if(this.state.currentRow !== ''){
        if(j > this.state.startingColumn){
          squares[this.state.currentRow][this.state.startingColumn]='left';
          squares[this.state.currentRow][j]='right';
          notes.push({
            row: this.state.currentRow,
            start: this.state.startingColumn,
            end: j,
          })

        } else if (this.state.startingColumn === j){

          squares[this.state.currentRow][j]='single';
          notes.push({
            row: this.state.currentRow,
            start: j,
            end: j,
          })

        } else  {
          squares[this.state.currentRow][this.state.startingColumn]='right';
          squares[this.state.currentRow][j]='left';

          notes.push({
            row: this.state.currentRow,
            start: j,
            end: this.state.startingColumn,
          })
        }
        currentInst.squares = squares;
        currentInst.notes = notes;
        insts[this.state.currentTab] = currentInst;
        this.setState({
          lastCellLeft: '',
          currentRow: '',
          twoCellsBack: '',
          mouseIsDown: false,
          instruments: insts,
          columnChanged: false,
          reversing: false,
          endingColumn: j,
        })
      }
      break;
      default:
        console.error('Something slipped through the mouse click switch statement')
  }
}


renderSquare(i,j) {
  let currentInst = this.state.instruments[this.state.currentTab]
  return (
    <Square
      key={i*currentInst.rows+j}
      cellStatus={currentInst.squares[i][j]}
      onMouseDown={() => this.handleClick(i,j,'down')}
      onMouseLeave={() => this.handleClick(i,j,'leave')}
      onMouseEnter={() => this.handleClick(i,j,'enter')}
      onMouseUp={() => this.handleClick(i,j,'up')}
      height={currentInst.height}
      width={currentInst.width}
    />
  );
}

createGrid = () => {
  let grid = [];
  //For the rows
  if(this.state.currentTab === 0){
  return(
    <NewInstrumentWindow
      newInstClick={()=>this.newInstClick()}
      countRows={this.countRows}
      instName={this.instName}
    />
  )
  }
  let currentInst = this.state.instruments[this.state.currentTab]
  let counter = -1
  for(let i = 0;i < currentInst.rows; i++){
    let row = []
    counter = i%NOTES.length===0 ? counter + 1: counter;
    let labelClass = NOTES[i%NOTES.length].includes('#') ?' sharp':'';
    row.push(<Label
                        noteName={NOTES[i%NOTES.length]}
                        key={NOTES[i%NOTES.length]+i}
                        className={'gridLabel '+ labelClass}
                        height={currentInst.height}
                        width={20}
                  />)
    //For each cell
    for (let j = 0; j < currentInst.columns; j++){
      row.push(this.renderSquare(i,j));
    }
    grid.push(<Row
      value={row}
      key= {i.toString()+row}
     className={'grid-row'+labelClass}
     height={currentInst.height}
  />
  );
  }
  return grid;
}

  render() {
    // Need to deal with this when the music infrastructure is around!
    // let isPlaying = !this.state.playing ? 'topButton playing':'topButton';
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

          <Grid
            createGrid={this.createGrid()}
            containerH={this.state.containerH}
            containerW={this.state.containerW}
            containerClass={this.state.containerClass}
           />

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



ReactDOM.render(
  <TBD2 />,
  document.getElementById('root')
);
