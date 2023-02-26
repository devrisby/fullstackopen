import IPerson from "../type/IPerson";
import Person from "./Person";

interface PropTypes {
    people: Array<IPerson>;
}

const People = ({people}: PropTypes) => {
    return (
        <div>
            {people.map((p) => <Person key={p.id} name={p.name} phone={p.phone} />)}
        </div>
    )
}

export default People;