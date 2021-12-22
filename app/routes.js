import React, { Component } from 'react'
import { Route, IndexRoute, Link } from 'react-router'

import Leaderboard from './components/Leaderboard';
import AddScore from './components/AddScore';
import AddScore2 from './components/AddScore2';

// Main component
class App extends Component {
  componentDidMount(){
    document.body.className=''
  }
  render(){
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

class NoMatch extends Component {
  render(){
    return (
      <div>
        <h2>NoMatch</h2>
        <div>404 error</div>
      </div>
    )
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Leaderboard}/>
    <Route path="addScore" component={AddScore}/>
    <Route path="addScore2" component={AddScore2}/>
    <Route path="*" component={NoMatch}/>
  </Route>
)