import React from "react";
import Button from "./Button";

interface PropTypes {
    name: string;
    nameOnChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    phone: string;
    phoneOnChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({name, nameOnChangeHandler,phone, phoneOnChangeHandler, onSubmitHandler}: PropTypes) => {
    return (
        <form onSubmit={onSubmitHandler}>
            <label>
                name:
                <input type="text" value={name} onChange={nameOnChangeHandler} />
            </label>
            <label>
                number:
                <input type="text" value={phone} onChange={phoneOnChangeHandler} />
            </label>
            <Button label="add" type="submit"/>
        </form>
    )
}

export default Form;