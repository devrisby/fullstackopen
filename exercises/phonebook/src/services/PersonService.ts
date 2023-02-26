import axios from "axios";
import IPerson from "../type/IPerson";
import IPersonDTO from "../type/IPersonDTO";

const baseURL = "http://localhost:3001/persons"

const getAll = () => axios.get<Array<IPerson>>(baseURL);
const create = (newPerson: IPersonDTO) => axios.post(baseURL, newPerson)
const update = (id: number, newPerson: IPerson) => axios.put(`${baseURL}/${id}`, newPerson);
const remove = (id:number) => axios.delete(`${baseURL}/${id}`)

export {
    getAll,
    create,
    update,
    remove
}