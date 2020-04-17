import React, { Component } from 'react'
import RedditUrlEntryField from './RedditUrlEntryField'
import ColorConfigurator from './ColorConfigurator'
import PieChartConfigurator from './PieChartConfigurator'

export default class Configuration extends Component {
    state = {
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
            <RedditUrlEntryField
                callback={(isValid, shortKey) => {
                    console.log(`isValid: ${isValid}\nshortKey: ${shortKey}`)
                }}
            />
            <ColorConfigurator {...this.state.colors} onChange={this.onColorChange} />
            <PieChartConfigurator {...this.state.pieChart} onChange={this.onPieChartChange} />
        </div>
    }
}
