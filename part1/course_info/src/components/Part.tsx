import IPart from "../models/PartModel";

const Part = ({part}: {part: IPart}) => {
    return <p>{part.name} {part.exercises}</p>
}

export default Part;