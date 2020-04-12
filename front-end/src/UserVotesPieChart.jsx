import React, { Component } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import CustomTooltip from './CustomTooltip'

export default class UserVotesPieChart extends Component {
    buildLayers() {
        let layerData = new Array(100)
        let cellData = new Array(100)
        let newLayers = []
        let innerRadius = 60
        let outerRadius = 80
        let previousLayerIndex = 0
        let layerIndex
        for (let [key, value] of Object.entries(this.props.rawData)) {
            layerIndex = (key - 1) / 100 << 0

            //If layer is fully represented in cellData, roll up layer
            if (previousLayerIndex < layerIndex) {

                newLayers[layerIndex - 1] = <Pie
                    key={`layer${layerIndex}`}
                    dataKey="value"
                    data={layerData}
                    cx={this.props.canvasWidth / 2}
                    cy={this.props.canvasHeight / 2}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                >
                    {cellData}
                </Pie>

                //Clear layerData and cellData
                layerData = new Array(100)
                cellData = new Array(100)

                //Update radii for next layer
                innerRadius += 30
                outerRadius += 30

                //Update previous layerIndex
                previousLayerIndex = layerIndex
            }

            layerData[(key - 1) % 100] = { name: key, value: 1, heat: value.length, who: value }
            cellData[(key - 1) % 100] = <Cell
                key={key}
                fill={this.props.colors[((input, max) => {
                    if (input === 0) return 0
                    if (input === 1) return 1

                    if (input / max <= 0.20) return 4
                    if (input / max <= 0.40) return 5
                    if (input / max <= 0.60) return 6
                    if (input / max <= 0.80) return 7
                    return 8
                })(value.length, 20)]}
            />
        }

        layerIndex++
        newLayers[layerIndex] = <Pie
            key={`layer${layerIndex}`}
            dataKey="value"
            data={layerData}
            cx={this.props.canvasWidth / 2}
            cy={this.props.canvasHeight / 2}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
        >
            {cellData}
        </Pie>

        return newLayers
    }

    render() {
        return (
            <PieChart width={this.props.canvasWidth} height={this.props.canvasHeight}>
                {this.buildLayers()}
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'rgba(255,255,255,0.75)',
                        color: '#262626',
                        maxWidth: '200px'
                    }}
                    content={<CustomTooltip />}
                />
            </PieChart>
        )
    }
}