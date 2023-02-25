import IPart from "../models/PartModel";

const Total = ({parts}: {parts: Array<IPart>}) => {
    return <p>Number of exercises {parts.reduce((prev, next) =>  prev+next.exercises, 0)}</p>
}

export default Total;