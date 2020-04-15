import React, { Component } from 'react'
import toRgba from '../Utilities/toRgba'

export default class ColorPreview extends Component {
    render() {
        const stepSize = {
            r: (this.props.end.r - this.props.start.r) / (this.props.steps - 1),
            g: (this.props.end.g - this.props.start.g) / (this.props.steps - 1),
            b: (this.props.end.b - this.props.start.b) / (this.props.steps - 1),
            a: (this.props.end.a - this.props.start.a) / (this.props.steps - 1)
        }
        const columns = [
            <div
                key={'colorStep0'}
                style={{
                    width: `${100 / this.props.steps}%`,
                    height: '14px',
                    background: toRgba(this.props.start)
                }}
            />
        ]

        for (let i = 1; i < this.props.steps - 1; i++) {
            columns[i] = <div
                key={`colorStep${i}`}
                style={{
                    width: `${100 / this.props.steps}%`,
                    height: '14px',
                    background: toRgba({
                        r: ((stepSize.r * i) + this.props.start.r) << 0,
                        g: ((stepSize.g * i) + this.props.start.g) << 0,
                        b: ((stepSize.b * i) + this.props.start.b) << 0,
                        a: (stepSize.a * i) + this.props.start.a
                    })
                }}
            />
        }

        columns[this.props.steps - 1] = <div
            key={`colorStep${this.props.steps - 1}`}
            style={{
                width: `${100 / this.props.steps}%`,
                height: '14px',
                background: toRgba(this.props.end)
            }}
        />

        return <>{columns}</>
    }
}
