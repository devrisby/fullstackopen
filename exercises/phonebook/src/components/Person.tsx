import IPerson from "../type/IPerson"

const Person = ({name, phone}: {name: string, phone: string}) => {
    return (
        <div>
            <p>{name} {phone}</p>
        </div>
    )
}

export default Person