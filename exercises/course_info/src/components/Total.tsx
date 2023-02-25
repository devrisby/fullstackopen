import IPart from "../models/PartModel";

const Total = ({parts}: {parts: Array<IPart>}) => {
    return <p><strong>Number of exercises {parts.reduce((prev, next) =>  prev+next.exercises, 0)}</strong></p>
}

export default Total;