import React, { Component } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import CustomTooltip from './CustomTooltip'

export default class UserVotesPieChart extends Component {
    render() {
        const COLORS = [
            '#ffffe5',
            '#f7fcb9',
            '#d9f0a3',
            '#addd8e',
            '#78c679',
            '#41ab5d',
            '#238443',
            '#006837',
            '#004529'
        ]

        let min = Infinity
        let max = 0

        const myData = Object.entries(this.props.rawData).map(([key, value]) => {
            min = value.length < min ? value.length : min
            max = value.length > max ? value.length : max
            return ({ name: key, value: 1, heat: value.length, who: value })
        })

        console.log(myData)

        const getColor = (input) => {
            if (input === 0) return 0
            if (input === 1) return 1

            if (input / max <= 0.20) return 4
            if (input / max <= 0.40) return 5
            if (input / max <= 0.60) return 6
            if (input / max <= 0.80) return 7
            return 8
        }

        const layer1 = myData.slice(1, 99)
        const layer2 = myData.slice(101, 199)
        const layer3 = myData.slice(201, 299)
        const layer4 = myData.slice(301, 399)
        const layer5 = myData.slice(401, 499)
        const layer6 = myData.slice(501, 599)
        const layer7 = myData.slice(601, 699)
        const layer8 = myData.slice(701, 799)
        const layer9 = myData.slice(801, 899)
        const layer10 = myData.slice(901, 999)

        const buildCell = (entry) => <Cell key={entry.name} fill={COLORS[getColor(entry.heat)]} />

        return (
            <PieChart width={800} height={800}>
                <Pie dataKey="value" data={layer1} cx={400} cy={400} outerRadius={60} fill="#8884d8">{layer1.map(buildCell)}</Pie>
                <Pie dataKey="value" data={layer2} cx={400} cy={400} innerRadius={70} outerRadius={90} fill="#8884d8">{layer2.map(buildCell)}</Pie>
                <Pie dataKey="value" data={layer3} cx={400} cy={400} innerRadius={100} outerRadius={120} fill="#8884d8">{layer3.map(buildCell)}</Pie>
                <Pie dataKey="value" data={layer4} cx={400} cy={400} innerRadius={130} outerRadius={150} fill="#8884d8">{layer4.map(buildCell)}</Pie>
                <Pie dataKey="value" data={layer5} cx={400} cy={400} innerRadius={160} outerRadius={180} fill="#8884d8">{layer5.map(buildCell)}</Pie>
                <Pie dataKey="value" data={layer6} cx={400} cy={400} innerRadius={190} outerRadius={210} fill="#8884d8">{layer6.map(buildCell)}</Pie>
                <Pie dataKey="value" data={layer7} cx={400} cy={400} innerRadius={220} outerRadius={240} fill="#8884d8">{layer7.map(buildCell)}</Pie>
                <Pie dataKey="value" data={layer8} cx={400} cy={400} innerRadius={250} outerRadius={270} fill="#8884d8">{layer8.map(buildCell)}</Pie>
                <Pie dataKey="value" data={layer9} cx={400} cy={400} innerRadius={280} outerRadius={300} fill="#8884d8">{layer9.map(buildCell)}</Pie>
                <Pie dataKey="value" data={layer10} cx={400} cy={400} innerRadius={310} outerRadius={330} fill="#8884d8">{layer10.map(buildCell)}</Pie>
                <Tooltip content={<CustomTooltip />} />
            </PieChart>
        )
    }
}