import React, { Component } from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'
import ColorPreview from './ColorPreview'
import ColorPicker from './ColorPicker'

const { Row, Column } = Grid

export default class ColorConfigurator extends Component {
    buildItems() {
        const options = []

        for (let i = 3; i <= 12; i++) {
            options.push({ key: `step${i}`, text: i, value: i })
        }
        return options
    }

    startColorCallback = ({ rgb }) => this.props.onChange({ startColor: rgb })

    endColorCallback = ({ rgb }) => this.props.onChange({ endColor: rgb })

    stepsCallback = (_, { value }) => this.props.onChange({ steps: value })

    render() {
        return <Grid>
            <Row columns={3} centered>
                <Column>
                    <ColorPicker
                        title='Start'
                        color={this.props.startColor}
                        callback={this.startColorCallback}
                    />
                </Column>
                <Column>
                    <ColorPicker
                        title='End'
                        color={this.props.endColor}
                        callback={this.endColorCallback}
                    />
                </Column>
                <Column>
                    <Dropdown
                        placeholder='Steps'
                        defaultValue={this.props.steps}
                        onChange={this.stepsCallback}
                        options={this.buildItems()}
                    />
                </Column>
            </Row>
            <ColorPreview
                start={this.props.startColor}
                end={this.props.endColor}
                steps={this.props.steps}
            />
        </Grid>
    }
}
