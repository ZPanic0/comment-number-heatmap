import React, { Component } from 'react'
import buildSteps from '../Utilities/buildSteps'

export default class ColorPreview extends Component {
    render() {
        return <div style={{
            width: '100%',
            padding: '2% 0',
            display: 'inherit'
        }}>{
                buildSteps(this.props.start, this.props.end, this.props.steps)
                    .map((value, index) => {
                        return <div
                            key={`colorStep${index}`}
                            style={{
                                width: `${100 / this.props.steps}%`,
                                height: '14px',
                                background: value
                            }}
                        />
                    })
            }</div>
    }
}
