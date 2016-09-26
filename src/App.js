import React, { Component } from 'react'
import './App.css'
import Topbar from './components/Topbar'
import Controls from './components/Controls'
import { Card, CardActions, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
let $ = require("expose?$!jquery");
// window.$ = $
// window.jQuery = $
require("./FlipClock/flipclock")
const styles = {
  App: {
  }
}

class App extends Component {

  constructor () {
    super()
    let defaults = {
      sessionTime: 30,
      breakTime: 5,
    }
    this.state = {
      status: 'stopped',
      currentBlock: 'session',
      expanded: false,
      sessionTime: defaults.sessionTime,
      breakTime: defaults.breakTime,
      timer: defaults.sessionTime,
      toggledSound: false,
      toggledNotifications: false,
      toggledRepeat: false
    }
  }

  componentDidMount () {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
    this.initCounter()
  }

  initCounter = () => {
    window.clock = $('.countdown').FlipClock(this.state.timer*60, {
      clockFace: 'MinuteCounter',
      countdown: true,
      autoStart: false,
      onStart: function () {
      },
      onStop: () => {
        if (window.clock.getFaceValue() === 0) {
          this.timerReached0()
        }
      }
    }).setCountdown(true).stop().reset()
  }

  timerReached0 = () => {
    // if in session, go to a break
    if (this.state.currentBlock === 'session') {
      this.setState({currentBlock: 'break'})
      this.playSound()
      this.showNotification()
      window.clock.setFaceValue(this.state.breakTime*60).start()
    }
    // if in break and repeat, loop to session again
    else if (this.state.currentBlock === 'break') {
      this.setState({currentBlock: 'session'})
      this.playSound()
      this.showNotification()
      if (this.state.toggledRepeat) {
        window.clock.setFaceValue(this.state.sessionTime*60).start()
        // reset the clock and stop
      }else {
        this.setState({status: 'stopped'})
        window.clock.setFaceValue(this.state.sessionTime*60)
      }
    }
  }

  playPause = () => {
    if (this.state.status === 'stopped') {
      this.setState({status: 'running'})
      window.clock.setFaceValue(this.state.sessionTime*60).start()
    }
    else if (this.state.status === 'paused') {
      this.setState({status: 'running'})
      window.clock.start()
    }else {
      this.setState({status: 'paused'})
      window.clock.stop()
    }
  }
  resetTimer = () => {
    this.setState({currentBlock: 'session', status: 'stopped'})
    window.clock.stop()
    window.clock.setFaceValue(this.state.sessionTime*60)
  }
  playSound = () => {
    if (this.state.toggledSound) {
      let audio = new Audio('https://mca62511.github.io/pomodoro/audio/ding.mp3')
      audio.play()
    }
  }
  showNotification = () => {
    if (this.state.toggledNotifications) {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission()}else {
        var notification = new Notification('Time is up!', {
          icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
          body: 'Time is up!'
        })
        notification.onclick = function () {
          window.open('')
        }
      }
    }
  }
  handleSound = (event, toggle) => this.setState({ toggledSound: toggle})
  handleNotifications = (event, toggle) => this.setState({ toggledNotifications: toggle})
  handleRepeat = (event, toggle) => this.setState({ toggledRepeat: toggle})
  handleFormSession = (event, value) => {
    this.setState({sessionTime: value})
  }
  handleFormBreak = (event,value) => {
    this.setState({breakTime: value})
  }

  increaseSession = () => {
    let newtime = this.state.sessionTime +1
    this.setState({sessionTime: newtime})
  }
  decreaseSession = () => {
    let newtime = this.state.sessionTime -1
    if(newtime>=0) this.setState({sessionTime: newtime})
  }
  increaseBreak = () => {
    let newtime = this.state.breakTime +1
    this.setState({breakTime: newtime})
  }
  decreaseBreak= () => {
    let newtime = this.state.breakTime -1
    if(newtime>=0) this.setState({breakTime: newtime})
  }


  render () {
    return (
      <div style={styles} id='App' className='App'>
        <Topbar/>
        <div id='content'>
          <Card id='card' zDepth={4}>
            <CardText id='timer'>
              <div className='countdown-wrapper'>
                <div className='countdown flip-clock-wrapper'>
                </div>
              </div>
            </CardText>
            <Controls
              sessionTime={this.state.sessionTime}
              breakTime={this.state.breakTime}
              decreaseSession={this.decreaseSession}
              increaseSession={this.increaseSession}
              decreaseBreak={this.decreaseBreak}
              increaseBreak={this.increaseBreak}
              toggledSound={this.state.toggledSound}
              toggledNotifications={this.state.toggledNotifications}
              toggledRepeat={this.state.toggledRepeat}
              handleSound={this.handleSound}
              handleNotifications={this.handleNotifications}
              handleFormSession={this.handleFormSession}
              handleFormBreak={this.handleFormBreak}
              handleRepeat={this.handleRepeat} />
            <CardActions>
              <FlatButton label={this.state.status === 'running' ? 'Pause' : 'Start'} onClick={this.playPause} />
              <FlatButton label='Reset' onClick={this.resetTimer} />
            </CardActions>
          </Card>
        </div>
      </div>
    )
  }
}

export default App
