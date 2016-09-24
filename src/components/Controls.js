import React from 'react'
import { CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'

const Controls = (props) => (
  <CardText id='text'>
    <div className='controls'>
      <p>
        Session
      </p>
      <span className='controlbox'><FlatButton onClick={props.decreaseSession} className='control-button' label='-' /> <p className='time-box'> {props.sessionTime} </p> <FlatButton onClick={props.increaseSession} className='control-button' label='+' /></span>
    </div>
    <div className='controls'>
      <p>
        Break
      </p>
      <span className='controlbox'><FlatButton onClick={props.decreaseBreak} className='control-button' label='-' /> <p className='time-box'> {props.breakTime} </p> <FlatButton onClick={props.increaseBreak} className='control-button' label='+' /></span>
    </div>
    <div className='controls'>
      <Toggle toggled={props.toggledSound} onToggle={props.handleSound} label='Sound' />
    </div>
    <div className='controls'>
      <Toggle toggled={props.toggledNotifications} onToggle={props.handleNotifications} label='Notifications' />
    </div>
    <div className='controls'>
      <Toggle toggled={props.toggledRepeat} onToggle={props.handleRepeat} label='Repeat' />
    </div>
  </CardText>
)

export default Controls
