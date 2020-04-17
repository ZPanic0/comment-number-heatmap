import React, { Component } from 'react'
import { SketchPicker } from 'react-color'
import { Label } from 'semantic-ui-react'
import ClickOverlay from '../Common/ClickOverlay'
const { Detail } = Label

export default class ColorPicker extends Component {
    state = { displayColorPicker: false }

    handleClick = () => this.setState({ displayColorPicker: !this.state.displayColorPicker })

    handleClose = () => this.setState({ displayColorPicker: false })

    handleChange = color => this.props.callback(color)

    render() {
        return <div>
            <Label>
                {this.props.title}
                <Detail
                    onClick={this.handleClick}
                    style={{
                        width: '36px',
                        height: '12px',
                        borderRadius: '2px',
                        background: `rgba(${this.props.color.r}, ${this.props.color.g}, ${this.props.color.b}, ${this.props.color.a})`,
                    }}>
                </Detail>
            </Label>
            {this.state.displayColorPicker && <div
                style={{
                    position: 'absolute',
                    zIndex: '2',
                }}>
                <ClickOverlay
                    display={this.state.displayColorPicker}
                    callback={this.handleClose}
                />
                <SketchPicker color={this.props.color} onChange={this.handleChange} />
            </div>}
        </div>
    }
}
