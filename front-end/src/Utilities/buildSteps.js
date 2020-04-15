import toRgba from '../Utilities/toRgba'

/**
* Builds rgba encoded color steps given a start color, end color, and the number of steps to take (start and end inclusive).
**/
export default function buildSteps(start, end, steps) {

    const stepSize = {
        r: (end.r - start.r) / (steps - 1),
        g: (end.g - start.g) / (steps - 1),
        b: (end.b - start.b) / (steps - 1),
        a: (end.a - start.a) / (steps - 1)
    }

    const stepData = [toRgba(start)]

    for (let i = 1; i < steps - 1; i++) {
        stepData[i] = toRgba({
            r: ((stepSize.r * i) + start.r) << 0,
            g: ((stepSize.g * i) + start.g) << 0,
            b: ((stepSize.b * i) + start.b) << 0,
            a: (stepSize.a * i) + start.a
        })
    }

    stepData[steps - 1] = toRgba(end)

    return stepData
}