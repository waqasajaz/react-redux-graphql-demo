import React, { Component } from 'react'
import HomesList from './HomesList'
import Header from './Header'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/admin/cities" component={HomesList} />
            <Route exact path="/cities" component={HomesList} /> 
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
