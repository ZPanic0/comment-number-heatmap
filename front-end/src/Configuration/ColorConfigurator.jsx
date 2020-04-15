import React, { Component } from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'
import ColorPreview from './ColorPreview'
import ColorPicker from './ColorPicker'

const { Row, Column } = Grid

export default class ColorConfigurator extends Component {
    state = {
        startColor: { r: 0, g: 0, b: 0, a: 1 },
        endColor: { r: 0, g: 0, b: 0, a: 1 },
        steps: 4
    }

    buildItems() {
        const options = []

        for (let i = 3; i <= 12; i++) {
            options.push({ key: `step${i}`, text: i, value: i })
        }
        return options
    }

    startColorCallback = ({ rgb }) => this.setState({ startColor: rgb })

    endColorCallback = ({ rgb }) => this.setState({ endColor: rgb })

    stepsCallback = (e, { value }) => this.setState({ steps: value })

    render() {
        return <Grid>
            <Row columns={3}>
                <Column>
                    <ColorPicker
                        title='Start'
                        color={this.state.startColor}
                        callback={this.startColorCallback}
                    />
                </Column>
                <Column>
                    <ColorPicker
                        title='End'
                        color={this.state.endColor}
                        callback={this.endColorCallback}
                    />
                </Column>
                <Column>
                    <Dropdown
                        placeholder='Steps'
                        onChange={this.stepsCallback}
                        options={this.buildItems()}
                    />
                </Column>
            </Row>
            <Row>
                <ColorPreview
                    start={this.state.startColor}
                    end={this.state.endColor}
                    steps={this.state.steps}
                />
            </Row>
        </Grid>
    }
}
