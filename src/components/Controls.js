import React from 'react'
import { CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import Slider from 'material-ui/Slider';



let styles = {
  backgroundColor: "#FDF6E3",
}


const Controls = (props) => (
  <CardText id='text'>
    <div className='controls'>
      <p>
        Session
      </p>
      <span className='controlbox'>
      <div className="slider-wrapper">
        <Slider
          className="slider"
          min={0}
          max={60}
          step={1}
          defaultValue={30}
          value={props.sessionTime}
          onChange={props.handleFormSession}
        />
      </div>
        <FlatButton
          backgroundColor={styles.backgroundColor}
          onClick={props.decreaseSession}
          className='control-button' label='-'
        />
      <div id="sessionForm">{props.sessionTime}</div>
        <FlatButton
          backgroundColor={styles.backgroundColor}
          onClick={props.increaseSession}
          className='control-button' label='+'
        />
    </span>
    </div>
    <div className='controls'>
      <p>
        Break
      </p>
      <span className='controlbox'>
      <div className="slider-wrapper">
        <Slider
          className="slider"
          min={0}
          max={60}
          step={1}
          defaultValue={30}
          value={props.breakTime}
          onChange={props.handleFormBreak}
        />
      </div>
        <FlatButton
          backgroundColor={styles.backgroundColor}
          onClick={props.decreaseBreak}
          className='control-button' label='-'
        />
      <div id="breakForm">{props.breakTime}</div>
        <FlatButton
          backgroundColor={styles.backgroundColor}
          onClick={props.increaseBreak}
          className='control-button' label='+'
        />
      </span>
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
