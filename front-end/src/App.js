import React, { Component } from 'react'
import './App.css'
import UserVotesPieChart from './UserVotesPieChart'

export default class App extends Component {
  componentDidMount() {
    fetch('/data')
      .then(response => response.json())
      .then(result => this.setState({ rawData: result }))
  }

  state = {
    rawData: null
  }
  
  render() {
    return (
      <div className="App">
        {this.state.rawData && <UserVotesPieChart rawData={this.state.rawData} />}
      </div>
    )
  }
}
