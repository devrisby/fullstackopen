import IPart from "../models/PartModel";

const Total = ({parts}: {parts: Array<IPart>}) => {
    return <p>Number of exercises {parts.length}</p>
}

export default Total;