import IPerson from "../type/IPerson";
import Person from "./Person";

interface PropTypes {
    people: Array<IPerson>;
    handleDelete: (person:IPerson) => void
}

const People = ({people, handleDelete }: PropTypes) => {
    return (
        <div>
            {people.map((p) => <Person key={p.id} person={p} handleDelete={handleDelete} />)}
        </div>
    )
}

export default People;