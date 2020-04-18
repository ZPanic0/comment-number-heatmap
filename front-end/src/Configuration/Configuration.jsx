import React, { Component } from 'react'
import { Grid, Button, Header } from 'semantic-ui-react'
import RedditUrlConfigurator from './RedditUrlConfigurator'
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
            startColor: { r: 255, g: 255, b: 229, a: 1 },
            endColor: { r: 0, g: 69, b: 41, a: 1 },
            steps: 7
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
        return <Grid
            columns='two'
            celled='internally'
            style={{
                backgroundColor: '#fff',
                width: '800px',
                height: '313px',
                position: 'absolute',
                padding: 0,
                margin: 'auto',
                display: 'block',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                boxShadow: '0 2px 3px rgba(10,10,10,0.1),0 0 0 1px rgba(10,10,10,0.1)'
            }}>
            <Grid.Row>
                <Grid.Column>
                    <Header style={{ height: '60%' }} as='h3'>Reddit Url</Header>
                    <RedditUrlConfigurator {...this.state.url} callback={this.onUrlChange} />
                </Grid.Column>
                <Grid.Column>
                    <Header as='h3'>Colors</Header>
                    <ColorConfigurator {...this.state.colors} onChange={this.onColorChange} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Header as='h3'>Raffle Configuration</Header>
                    <PieChartConfigurator {...this.state.pieChart} onChange={this.onPieChartChange} />
                </Grid.Column>
                <Grid.Column>
                    <Button style={{ bottom: 0, right: 0, position: 'absolute', margin: '1%' }}>Generate</Button>
                </Grid.Column>
            </Grid.Row>

        </Grid>
    }
}
