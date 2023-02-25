import Stat from "./Stat";

interface PropTypes {
    good: number;
    neutral: number;
    bad: number;
    all: number;
    average: number;
    positive: string;
}

const Statistics = ({good, neutral, bad, all, average, positive}: PropTypes) => {
    return (
        <table>
            <tbody>
                <Stat label='good' data={good} />
                <Stat label='neutral' data={neutral} />
                <Stat label='bad' data={bad} />
                <Stat label='all' data={all} />
                <Stat label='average' data={average} />
                <Stat label='positive' data={positive} /> 
            </tbody>
        </table>
    )
}

export default Statistics
