import React from 'react'

function TabButton(props){
  return(
    <button className={'tabButton '+props.tabName+' '+props.classToggle}
      onMouseDown={props.tabClick}
      key={props.index}
      >{props.tabName}</button>
  )
}

function TabButtons(props){
  return(
    <div className={props.className}>
      {props.tabs}
    </div>
  )
}

export { TabButton, TabButtons }
