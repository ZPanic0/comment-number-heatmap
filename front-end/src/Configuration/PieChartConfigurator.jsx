import React, { Component } from 'react'
import { Label, Input } from 'semantic-ui-react'

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
            <Label>
                Raffle Range
                <Input
                    name='startRange'
                    type='number'
                    min={1}
                    max={this.props.endRange}
                    value={this.props.startRange}
                    onChange={this.onChange} />
                to
                <Input
                    name='endRange'
                    type='number'
                    min={this.props.startRange}
                    value={this.props.endRange}
                    onChange={this.onChange} />
            </Label>
            <Label>
                Layers
                <Input
                    name='layers'
                    type='number'
                    min={1}
                    value={this.props.layers}
                    onChange={this.onChange}
                />
            </Label>
        </div>
    }
}
