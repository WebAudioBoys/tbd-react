import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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

function Tab(props){
  return(

  )
}
//Prototype of each grid cell
function Square(props){
  return (
    //what is inside the state of the grid goes here
      <button className={styleSquares(props.cellStatus)}
        onMouseDown={props.onMouseDown}
        onMouseLeave={props.onMouseLeave}
        onMouseEnter={props.onMouseEnter}
        onMouseUp={props.onMouseUp}
        >{props.value}
      </button>
    );
  }

//Proto of each row
  function Row(props){
      return (
        <div className="grid-row" onClick={props.onClick} key={props.key}>
          {props.value}
        </div>
      );
    }

//Creates the Grid
class Grid extends React.Component {

  constructor(props) {
    console.log(props);
    super(props);
    let empty = [];
    for (var i = 0; i < 10;i++){ empty.push([])
      for (var j = 0; j < 32; j++) {
        empty[i].push([]);
      }
    }
    this.state = {
      squares: empty,
      currentRow: '',
      currentColumn:'',
      lastCellLeft: '',
      twoCellsBack: '',
      mouseIsDown: false,
      startingColumn: '',
      columnChanged: '',
      reversing: false,
      endingColumn: '',
    }

  }


  handleClick(i,j,clickType) {
    const squares = this.state.squares.slice();
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
          } else if (this.state.startingColumn === j){
            console.log('i am in')
            squares[this.state.currentRow][j]='single';
          } else  {
            squares[this.state.currentRow][this.state.startingColumn]='right';
            squares[this.state.currentRow][j]='left';
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
      />
    );
  }



  createGrid = () => {
    let grid = [];
    //For the rows
    for(let i = 0;i < 10; i++){
      let row = []
      //For each cell
      for (let j = 0; j < 32; j++){
        row.push(this.renderSquare(i,j));
      }
      grid.push(Row({value: row, key: i}));
    }
    return grid;
  }

  render() {
    let status;
    return (
      <div>
        <div className="status">{status}</div>
        {this.createGrid()}
      </div>
    );
  }
}


class TabContent extends React.Component{
  render(){


  }
}

class TBD2 extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="topBar">
        <div className="bold_text"> tbd 2 </div>
      </div>

        <div className="gridContainer">
          <Grid />
        </div>
        <div className="otherShit">
          <div class='howto'>
						<p><b>Click + Drag</b>Create Note</p>
						<p><b>Alt + Click</b>Trim/Extend Note</p>
						<p><b>Shift + Click</b>Create Single Notes</p>
						<p><b>Backspace</b>Delete Selected Note</p>
					</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <TBD2 />,
  document.getElementById('root')
);
