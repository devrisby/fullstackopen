import Button from "./Button";

interface propTypes {
    setGood: () => void;
    setNeutral: () => void;
    setBad: () => void;

}

const Feedback = ({setGood, setNeutral, setBad}: propTypes) => {
    return (
        <div className="feedback">
            <Button label="good" action={setGood} />
            <Button label="neutral" action={setNeutral} />
            <Button label="bad" action={setBad} />
        </div>
    )
}

export default Feedback;