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
        {this.state.rawData && <UserVotesPieChart
          rawData={this.state.rawData}
          colors={['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529']}
          canvasWidth={800}
          canvasHeight={800}
        />}
      </div>
    )
  }
}
