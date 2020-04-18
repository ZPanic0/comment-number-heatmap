import React, { Component } from 'react'
import { Input, Icon } from 'semantic-ui-react'

export default class RedditUrlConfigurator extends Component {
    regex = /.*?reddit\.com\/r\/[A-z]+\/comments\/(?<shortKey>[a-z0-9]{6})\/.*/g

    validate = ({ target: { value } }) => {
        if (!value) return this.props.callback({
            isValid: null,
            value: value,
            shortKey: ''
        })

        const matches = Array.from(value.matchAll(this.regex), m => m[1])

        if (!matches.length) return this.props.callback({
            isValid: false,
            value: value,
            shortKey: ''
        })

        this.props.callback({
            isValid: true,
            value: value,
            shortKey: matches[0]
        })
    }

    resolveIcon = () => {
        if (this.props.isValid == null) return null
        if (!this.props.isValid) return <Icon name='times' color='red' />
        return <Icon name='check' color='green' />
    }

    render() {
        return <div style={this.props.style}>
            <Input
                size='mini'
                style={{ width: '100%' }}
                label={this.props.isValid && this.props.shortKey}
                labelPosition='right'
                onChange={this.validate}
                value={this.props.url}
                icon={this.resolveIcon}
                iconPosition='left'
            />
        </div>
    }
}
