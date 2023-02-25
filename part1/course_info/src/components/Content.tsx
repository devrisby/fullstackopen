import IPart from '../models/PartModel'
import Part from './Part';

const Content = ({parts}: {parts: Array<IPart>}) => {
    return (
        <div>
            {parts.map((part: IPart, index: number) => <Part key={index} part={part} />)}
        </div>
    )
}

export default Content;