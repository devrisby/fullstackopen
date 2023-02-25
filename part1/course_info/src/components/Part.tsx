import IPart from "../models/PartModel";

const Part = ({part}: {part: IPart}) => {
    return <p>{part.part} {part.exercises}</p>
}

export default Part;