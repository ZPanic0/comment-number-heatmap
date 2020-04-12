import React, { Component } from 'react'

const style = {
    backGroundColor: 'rgba(255,255,255,0.75)',
    color: '#262626',
    maxWidth: '200px'
}

//Prop structure is controlled by Recharts parent tooltip. Just accept it
export default class CustomTooltip extends Component {
    render() {
        const { active } = this.props;

        if (active) {
            const { payload } = this.props;
            return (
                <div style={style}>
                    <p className="label">{`Number ${payload[0].name}: ${payload[0].payload.heat} users.`}</p>
                    <p className="label">Users: {payload[0].payload.who.join(', ')}</p>
                </div>
            );
        }

        return null;
    }
}
