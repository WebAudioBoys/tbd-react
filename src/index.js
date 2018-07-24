import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TopBar from './components/top-bar.jsx'
import Grid from './components/grid.jsx'
import WebMidi from 'webmidi'
import Tone from 'tone'
var MIDI;
var clock;
const NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B',];

class TBD2 extends React.Component {

  render() {
    return (
      <div className="container">
          <TopBar />
          <Grid rows="30" columns="30" />
          <p></p>
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
