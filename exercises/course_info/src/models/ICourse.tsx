import IPart from "./PartModel";

export default interface ICourse {
    id: number;
    name: string;
    parts: Array<IPart>
}