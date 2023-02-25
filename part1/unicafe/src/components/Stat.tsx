const Stat = ({label, data}: {label: string, data: number|string}) => {
    return (
        <tr>
            <td>{label}</td>
            <td>{data}</td> 
        </tr>
    )
}

export default Stat;