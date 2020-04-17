import React, { Component } from 'react'
import RedditUrlEntryField from './RedditUrlEntryField'
import ColorConfigurator from './ColorConfigurator'
import PieChartConfigurator from './PieChartConfigurator'

export default class Configuration extends Component {
    state = {
        url: {
            isValid: null,
            value: '',
            shortKey: ''
        },
        colors: {
            startColor: { r: 0, g: 0, b: 0, a: 1 },
            endColor: { r: 0, g: 0, b: 0, a: 1 },
            steps: 4
        },
        pieChart: {
            layers: 1,
            startRange: 1,
            endRange: 100
        }
    }

    onUrlChange = (newState) => {
        this.setState(prevState => ({
            url: { ...prevState.url, ...newState }
        }))
    }

    onColorChange = (newState) => {
        this.setState(prevState => ({
            colors: { ...prevState.colors, ...newState }
        }))
    }

    onPieChartChange = (newState) => {
        this.setState(prevState => ({
            pieChart: { ...prevState.pieChart, ...newState }
        }))
    }

    render() {
        return <div>
            <RedditUrlEntryField {...this.state.url} callback={this.onUrlChange} />
            <ColorConfigurator {...this.state.colors} onChange={this.onColorChange} />
            <PieChartConfigurator {...this.state.pieChart} onChange={this.onPieChartChange} />
        </div>
    }
}
