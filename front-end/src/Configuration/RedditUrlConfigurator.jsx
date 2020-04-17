import React, { Component } from 'react'
import { Label, Input, Icon } from 'semantic-ui-react'

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
        console.log(this.props)
        return <div className='ui labeled input'>
            <Label>Reddit Url:</Label>
            <Input
                onChange={this.validate}
                value={this.props.url}
                icon={this.resolveIcon}
            />
            {this.props.isValid && <Label>{this.props.shortKey}</Label>}
        </div>
    }
}
