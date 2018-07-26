

constructor(props) {
  super(props);
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
