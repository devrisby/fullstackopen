import IPerson from "../type/IPerson"
import Button from "./Button"

interface PropTypes {
    person: IPerson;
    handleDelete: (person:IPerson) => void
}

const Person = ({person, handleDelete}: PropTypes ) => {
    return (
        <div className="person">
            <div>
                <p className="name">{person.name}</p>
                <p>{person.phone}</p>
            </div>
            <div>
                <Button label="delete" action={() => handleDelete(person)} type={undefined} />
            </div>
        </div>
    )
}

export default Person