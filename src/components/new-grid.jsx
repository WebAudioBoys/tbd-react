import React from 'react';


const NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B',];
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
        <div className={props.className} onClick={props.onClick} style={{height: props.height, width: 'auto'}}>
          {props.value}
        </div>
      )
    }

//Creates the Grid
function Grid(props) {
  constructor(props) {
    super(props);
    let empty = [];
    let containerH = 500
    let containerW = window.innerWidth - 50;
    let height = 500/props.rows;
    let width = Math.ceil(containerW-20)/(props.columns);
    containerW = 20+(width * props.columns);

    console.log('Cont',containerW,'width',width, 'cols', props.columns)
    for (var i = 0; i < props.rows;i++){ empty.push([])
      for (var j = 0; j < props.columns; j++) {
        empty[i].push([]);
      }
    }
    this.state = {
      squares: empty,
      rows: props.rows,
      columns: props.columns,
      height: height,
      width: width,
      currentRow: '',
      currentColumn:'',
      lastCellLeft: '',
      twoCellsBack: '',
      mouseIsDown: false,
      startingColumn: '',
      columnChanged: '',
      reversing: false,
      endingColumn: '',
      notes: [],
      containerW: containerW,
      containerH: containerH,
    }

  }

  handleClick(i,j,clickType) {
    let squares = this.state.squares.slice();
    let notes = this.state.notes.slice();
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
          console.log(columnChanged);
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

            console.log(j-this.state.startingColumn)
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
          this.setState({
            lastCellLeft: '',
            currentRow: '',
            twoCellsBack: '',
            mouseIsDown: false,
            squares: squares,
            columnChanged: false,
            reversing: false,
            endingColumn: j,
            notes: notes,
          })

        }
        break;
        default:
          console.log('fuck')
    }
  }



  renderSquare(i,j) {
    return (
      <Square
        key={i*10+j}
        cellStatus={this.state.squares[i][j]}
        onMouseDown={() => this.handleClick(i,j,'down')}
        onMouseLeave={() => this.handleClick(i,j,'leave')}
        onMouseEnter={() => this.handleClick(i,j,'enter')}
        onMouseUp={() => this.handleClick(i,j,'up')}
        height={this.state.height}
        width={this.state.width}
      />
    );
  }



  createGrid = () => {
    let grid = [];
    //For the rows
    let counter = -1
    for(let i = 0;i < this.state.rows; i++){
      let row = []
      counter = i%NOTES.length===0 ? counter + 1: counter;
      let labelClass = NOTES[i%NOTES.length].includes('#') ?' sharp':'';
      row.push(<Label
                          noteName={NOTES[i%NOTES.length]}
                          key={NOTES[i%NOTES.length]+counter}
                          className={'gridLabel '+ labelClass}
                          height={this.state.height}
                          width={20}
                    />)
      //For each cell
      for (let j = 0; j < this.state.columns; j++){
        row.push(this.renderSquare(i,j));
      }
      grid.push(Row({value: row, key: -1*i, className: 'grid-row'+labelClass,height: this.state.height}));
    }

    return grid;
  }

  render() {

    return (
      <GridContainer
        grid ={this.createGrid()}
        className="gridContainer"
        height={this.state.containerH}
        width={this.state.containerW}
      />
    );
  }
}
export default Grid
