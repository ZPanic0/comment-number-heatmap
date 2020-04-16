import React, { Component } from 'react'
import RedditUrlEntryField from './RedditUrlEntryField'
import ColorConfigurator from './ColorConfigurator'
import PieChartConfigurator from './PieChartConfigurator'

export default class Configuration extends Component {
    state = {
        pieChart: {
            layers: 1,
            startRange: 1,
            endRange: 100
        }
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
            <ColorConfigurator />
            <PieChartConfigurator {...this.state.pieChart} onChange={this.onPieChartChange} />
        </div>
    }
}
