import React, { Component } from 'react'
import RedditUrlEntryField from './RedditUrlEntryField'

export default class Configuration extends Component {

    render() {
        return <div>
            <RedditUrlEntryField
                callback={(isValid, shortKey) => {
                    console.log(`isValid: ${isValid}\nshortKey: ${shortKey}`)
                }}
            />
        </div>
    }
}