import React, { Component } from 'react'

export default class ClickOverlay extends Component {
    render() {
        return this.props.display && <div
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }}
            onClick={this.props.callback}
        />
    }
}
