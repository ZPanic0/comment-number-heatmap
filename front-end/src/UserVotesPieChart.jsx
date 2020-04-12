import React, { Component } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import CustomTooltip from './CustomTooltip'

export default class UserVotesPieChart extends Component {
    max = 0

    buildLayer(key, data, x, y, innerRadius, outerRadius) {
        return <Pie
            key={key}
            dataKey="value"
            data={data}
            cx={x}
            cy={y}
            innerRadius={innerRadius}
            outerRadius={outerRadius}>
            {data.map(entry => <Cell
                key={entry.name}
                fill={this.props.colors[this.getColor(entry.heat)]}
            />)}
        </Pie>
    }

    getColor(input) {
        if (input === 0) return 0
        if (input === 1) return 1

        if (input / this.max <= 0.20) return 4
        if (input / this.max <= 0.40) return 5
        if (input / this.max <= 0.60) return 6
        if (input / this.max <= 0.80) return 7
        return 8
    }

    render() {
        this.max = 0

        const myData = Object.entries(this.props.rawData).map(([key, value]) => {
            this.max = value.length > this.max ? value.length : this.max

            return ({ name: key, value: 1, heat: value.length, who: value })
        })

        let layers = []

        for (let i = 0, startRadius = 60, endRadius = 80; i < 10; i++, startRadius += 30, endRadius += 30) {
            layers[i] = this.buildLayer(
                `layer${i}`,
                myData.slice(i * 100 + 1, i * 100 + 99),
                this.props.canvasWidth / 2,
                this.props.canvasHeight / 2,
                startRadius,
                endRadius
            )
        }

        return (
            <PieChart width={this.props.canvasWidth} height={this.props.canvasHeight}>
                {layers}
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