import React, { Component } from 'react'

//Prop structure is controlled by Recharts parent tooltip. Just accept it
export default class CustomTooltip extends Component {
    render() {
        const { active } = this.props

        if (active) {
            const { payload } = this.props

            return <div style={this.props.contentStyle}>
                <p className="label">{`Number ${payload[0].name}: ${payload[0].payload.heat} users.`}</p>
                <p className="label">Users: {payload[0].payload.who.join(', ')}</p>
            </div>
        }

        return null;
    }
}