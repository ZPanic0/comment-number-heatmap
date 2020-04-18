import React, { Component } from 'react'
import { Grid, Input } from 'semantic-ui-react'

export default class PieChartConfigurator extends Component {
    onChange = ({ target }) => {
        const value = parseInt(target.value)

        if (isNaN(value)) return
        //Belt and suspenders for browsers that don't properly enforce min and max fields on inputs
        if (target.name === 'startRange' && value > this.props.endRange) return
        if (target.name === 'endRange' && value < this.props.startRange) return

        this.props.onChange({ [target.name]: value })
    }

    render() {
        return <div>
            <Grid divided='vertically'>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Input
                            style={{ width: '60%' }}
                            name='startRange'
                            type='number'
                            label='From'
                            size='mini'
                            min={1}
                            max={this.props.endRange}
                            value={this.props.startRange}
                            onChange={this.onChange} />
                    </Grid.Column>
                    <Grid.Column>
                        <Input
                            style={{ width: '60%' }}
                            name='endRange'
                            type='number'
                            label='to'
                            size='mini'
                            min={this.props.startRange}
                            value={this.props.endRange}
                            onChange={this.onChange} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Input
                            name='layers'
                            type='number'
                            label='Layers'
                            size='mini'
                            min={1}
                            value={this.props.layers}
                            onChange={this.onChange} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    }
}
