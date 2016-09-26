import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin';

require('!style!css!./FlipClock/flipclock.css')

injectTapEventPlugin();
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: '#01579B',
    primary1Color: '#55486E',
    textColor: '#424242'
  }
})



ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
)
