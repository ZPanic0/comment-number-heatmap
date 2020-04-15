/**
* Converts a given color object with r, g, b, and a properties to the corresponding rgba encoded css property.
**/
export default function toRgba({ r, g, b, a }) {
    return `rgba(${r}, ${g}, ${b}, ${a})`
}