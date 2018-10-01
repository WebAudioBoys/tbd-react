import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TopBar from './components/top-bar.jsx'
import Grid from './components/grid.jsx'
import Note from './components/note.jsx'
import {TabButton, TabButtons} from './components/tab-buttons.jsx'
import {Row, Label, Square} from './components/rows.jsx'
import NewInstrumentWindow from './components/newInstrumentWindow.jsx'
import GridLines from './components/grid-lines.jsx'

const NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B',];



const getProgress = ({elapsed, total}) =>
  Math.min(elapsed / total, 1);

const element = document.querySelector("span");
const finalPosition = 200;

var time = {
  start: performance.now(),
  total: 200,
  counter: 0,
  started: false,
};

const tick = now => {
  time.elapsed = now - time.start;
  const progress = getProgress(time);
  const position = progress * finalPosition;
  if (progress < 1){
  	requestAnimationFrame(tick);
  } else {
    if(time.started){
  	time = {
  		  start: performance.now(),
  	  	total: 200,
  	  	counter: (time.counter)%32,
        started: true,
  	  };
  	requestAnimationFrame(tick);
  	console.log(time.counter);
  	time.counter += 1;
  } else {
    console.log('Stopped')
  }

  }
};




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
      noteStarted:false,
      startPos:'',
      currPos:'',
      endPos:'',
      containerClass: 'gridContainer',
      currentColumn:'',
      lastCellLeft: '',
      twoCellsBack: '',
      mouseIsDown: false,
      measures: 2,
      quant: 0,
      startingColumn: '',
      columnChanged: '',
      reversing: false,
      newInst:{name: '', rows: ''},
      containerW: containerW,
      rowWidrh: containerW-24,
      containerH: containerH,
      endingColumn: '',
      tabs: [{tabName: '+', index: 0, classToggle: ''  },{tabName: 'TBD', index: 1,classToggle: 'selected'}],
      instruments:[{

      },{
        squares: [],
        rows: 128,
        zoom: 32,
        columns: 32,
        height: '',
        width:'',
        notes: [],
        }],
    }

    // for(let i = 1; i<this.state.instruments.length;i++){
    let currentInst = this.state.instruments[1];
    currentInst.height = currentInst.rows > 29 ? 500/30 : 500/currentInst.rows;
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
    this.quantChange = this.quantChange.bind(this);
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



  quantChange(event){
    let newQuant = event.target[event.target.selectedIndex].getAttribute('val');
    let insts = this.state.instruments.slice();
    let ix = this.state.currentTab;
    if(newQuant){
      let stepSize = (this.state.containerW-24)/(newQuant*this.state.measures);

      insts[ix].notes = insts[ix].notes.map(el => {return {
        start: stepSize*Math.round(el.start/stepSize)+24,
        end: 24 + stepSize*Math.round(el.start/stepSize) + el.end-el.start,
        row: el.row,
      }
      });
    }
    //Create the grid subdivision overlays

    this.setState({
        quant: newQuant,
        instruments: insts,
    })
  }

  handleForPlay(){
    let toggle = !this.state.playing
    this.setState({
      playing: toggle,
    })
    if(toggle){
      time.started = true;
    requestAnimationFrame(tick);
  } else {
    time.started = false;
    // cancelAnimationFrame(raf);
  }

  }

  zoom(inout){
    let insts = this.state.instruments.slice();
    let ix = this.state.currentTab;
    switch(inout){
      case "in":
      if(insts[ix].zoom>4){
      insts[ix].zoom-=4;
      insts[ix].height = 500/insts[ix].zoom;
      }
      break;
      case "out":
      if(insts[ix].zoom<128){
      insts[ix].zoom+=4;
      insts[ix].height = 500/insts[ix].zoom;
      }
      break;
      default:
      console.err("Zoom in flag improperly sent");
    }
    this.setState({
      instruments: insts
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
    let newHeight = this.state.newInst.rows > this.state.zoom ? 500/32 : 500/this.state.newInst.rows;
    let newInst ={
        squares: createEmptygrid(this.state.newInst.rows),
        rows: 128,
        columns: 32,
        zoom:32,
        height: newHeight,
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

handleRowClick(e,index,clickType){
  let insts = this.state.instruments.slice();
  switch(clickType){
    case 'down':
    this.setState({
      currentRow: index,
      startPos: e.clientX-22,
      endPos:  e.clientX-22,
      mouseIsDown: true,
      reversing:false,
    });
    break;

    case 'move':

      if(this.state.mouseIsDown){
        let poles = [this.state.startPos,e.clientX-22].sort((a,b)=> {return a - b});
        if(!this.state.noteStarted){
          insts[this.state.currentTab].notes.push({
              start:poles[0],
              end: poles[1],
              row:this.state.currentRow
              }
          );
            this.setState({
              noteStarted:true,
              instruments: insts,
            });
        } else {
          let currIx = insts[this.state.currentTab].notes.length-1;
          insts[this.state.currentTab].notes[currIx] = {start:poles[0],end: poles[1],row:this.state.currentRow}
          this.setState({
            instruments: insts,
          });
        }
      }
    break;
    case 'up':
    this.setState({
      noteStarted: false,
      mouseIsDown:false,
      instruments: insts,
    });
    break;
    default:
    break;

  }

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



    grid.push(<Row
      value={row}
      key= {i.toString()+row}
     className={'grid-row'+labelClass}
     height={currentInst.height}
     onMouseDown={(e)=>this.handleRowClick(e,i,'down')}
     onMouseMove ={(e)=>this.handleRowClick(e,i,'move')}
     onMouseUp ={(e)=>this.handleRowClick(e,i,'up')}
  />
  );
  }

  for(let i=0;i<currentInst.notes.length;i++){
    let currentNote = currentInst.notes[i];
    grid[currentNote.row].props.value.push(

      <Note
        className={'note'}
        key={i}
        width={currentNote.end-currentNote.start}
        position={currentNote.start}
      />
    )
  }

  if(this.state.quant !== 0){
    let width = (this.state.containerW-24)/(this.state.quant*2);
    for(let i= 0; i < this.state.quant*2; i++){
      grid.push(<GridLines width={width} left={i*width+24} key={i} className='grid-lines'/>)
    }
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
            zoomIn={()=>this.zoom("in")}
            zoomOut={()=>this.zoom("out")}
            quantChange={this.quantChange}
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
