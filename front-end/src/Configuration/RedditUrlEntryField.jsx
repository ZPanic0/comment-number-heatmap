import React, { Component } from 'react'
import { Label, Input, Icon } from 'semantic-ui-react'

export default class RedditUrlEntryField extends Component {
    regex = /.*?reddit\.com\/r\/[A-z]+\/comments\/(?<shortKey>[a-z0-9]{6})\/.*/g

    state = {
        isValid: null,
        shortKey: null
    }

    constructor(props) {
        super(props)

        this.validate = this.validate.bind(this)
    }

    validate({ target: { value } }) {
        if (!value) {
            this.setState({
                isValid: null,
                shortKey: null
            })

            this.props.callback && this.props.callback(false)
            return
        }

        const matches = Array.from(value.matchAll(this.regex), m => m[1])

        if (!matches.length) {
            this.setState({
                isValid: false,
                shortKey: null
            })

            this.props.callback && this.props.callback(false)
            return
        }

        this.setState({
            isValid: true,
            shortKey: matches[0]
        })

        this.props.callback && this.props.callback(true, matches[0])
    }

    render() {
        return <div className='ui labeled input'>
            <Label>Reddit Url:</Label>
            <Input
                onChange={this.validate}
                icon={() => {
                    if (this.state.isValid == null) return null
                    if (!this.state.isValid) return <Icon name='times' color='red' />
                    return <Icon name='check' color='green' />
                }}
            />
            {this.state.isValid && <Label>{this.state.shortKey}</Label>}
        </div>
    }
}
