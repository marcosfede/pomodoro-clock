import React, { Component } from 'react'
import './App.css'
// import './components/FlipClock.css'
import Topbar from './components/Topbar'
import Controls from './components/Controls'
import { Card, CardActions, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import $ from 'jquery'
window.$ = $
window.jQuery = $
window.FlipClock = require('../FlipClock/dev/dist/flipclock')

const styles = {
  App: {
  }
}

class App extends Component {

  constructor () {
    super()
    let defaults = {
      sessionTime: 5,
      breakTime: 3
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

  slideUp = () => {
    $('#text').slideUp(300)
  }
  slideDown = () => {
    $('#text').slideDown(300)
  }

  initCounter = () => {
    window.clock = $('.countdown').FlipClock(this.state.timer,{
      clockFace: 'MinuteCounter',
      countdown: true,
      autoStart: false,
      onStart: function () {
        console.log('start')
      },
      onReset:  () => {console.log('Reset')},
      onStop:  () => {
        if (window.clock.getFaceValue()===0){
          this.timerReached0()
        }
      },
    }).setCountdown(true).stop().reset()

  }

  timerReached0 = () => {
    if (this.state.currentBlock === 'session'){
      this.setState({currentBlock: 'break'})
      this.playSound()
      this.showNotification()
      clock.setFaceValue(this.state.breakTime).start()
    }
  }

  playPause = () => {
    if (this.state.status === 'stopped') {
      this.setState({status: 'running', timer: this.state.sessionTime})
      window.clock.start()
      this.timeout()
    }
    else if (this.state.status === 'paused' && this.state.timer > 0) {
      this.setState({status: 'running'})
      window.clock.start()
      this.timeout()
    }
    else {
      this.setState({status: 'paused'})
      window.clock.stop()
    }
  }
  resetTimer = () => {
    this.setState({timer: this.state.sessionTime, status: 'stopped', currentBlock: 'session'})
    window.clock.stop()
    window.clock.setFaceValue(this.state.sessionTime)
    window.setTimeout(() => this.setState({timer: this.state.sessionTime}), 1000)
  }
  playSound = () => {
    let audio = new Audio('https://mca62511.github.io/pomodoro/audio/ding.mp3')
    audio.play()
  }
  showNotification = () => {
    if (Notification.permission !== 'granted')
      Notification.requestPermission()
    else {
      var notification = new Notification('Time is up!', {
        icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
        body: "Time is up!"
      })
      notification.onclick = function () {
        window.open('http://stackoverflow.com/a/13328397/1269037')
      }
    }
  }
  handleSound = (event, toggle) => {
    this.setState({ toggledSound: toggle})}
  handleNotifications = (event, toggle) => {
    this.setState({ toggledNotifications: toggle})}
  handleRepeat = (event, toggle) => {
    this.setState({ toggledRepeat: toggle})}

  // this block will be deleted in the furure

  secToMinutes = (sec) => {
    let min = Math.floor(sec / 60)
    let remainingsec = sec % 60
    let zeroremainingsec = remainingsec < 10 ? '0' + remainingsec : remainingsec
    return `${min}:${zeroremainingsec}`
  }

  timeout = () => {
    window.setTimeout(() => {
      this.setState({timer: this.state.timer - 1})
      this.stopOrTimeout()
    }, 1000)
  }

  stopOrTimeout = () => {
    // check if the user hasn't stoped the timer
    if (this.state.status === 'running') {
      // check if the timer didn't reach 0
      if (this.state.timer !== 0) {
        this.timeout()
      }
      // timer reached 0 here
      // check if we are in session or break timer
      else if (this.state.currentBlock === 'session') {
        if(this.state.toggledSound) this.playSound()
        if (this.state.toggledNotifications) this.showNotification()
        // go for a break
        this.setState({currentBlock: 'break', timer: this.state.breakTime})
        this.timeout()
        // here we ended a cycle, reached 0 in break mode
      }else {
        if(this.state.toggledSound) this.playSound()
        if (this.state.toggledNotifications) this.showNotification()
        // repeat ?
        if (this.state.toggledRepeat) {
          this.setState({status: 'running', timer: this.state.sessionTime, currentBlock:'session'})
          this.timeout()
          // stop
        }else {this.setState({status: 'stopped'})}
      }
    }
  }
  //
  render () {
    return (
      <div style={styles} id='App' className='App'>
        <Topbar/>
        <div id='content'>
          <Card id='card' zDepth={4}>
            <CardText id='timer'>
              <div className="countdown-wrapper">
                <div className="countdown flip-clock-wrapper">
                </div>
              </div>
            </CardText>
            <Controls
              sessionTime={this.state.sessionTime}
              breakTime={this.state.breakTime}
              decreaseSession={() => this.setState({sessionTime: --this.state.sessionTime})}
              increaseSession={() => this.setState({sessionTime: ++this.state.sessionTime})}
              decreaseBreak={() => this.setState({breakTime: --this.state.breakTime})}
              increaseBreak={() => this.setState({breakTime: ++this.state.breakTime})}
              toggledSound={this.state.toggledSound}
              toggledNotifications={this.state.toggledNotifications}
              toggledRepeat={this.state.toggledRepeat}
              handleSound={this.handleSound}
              handleNotifications={this.handleNotifications}
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
