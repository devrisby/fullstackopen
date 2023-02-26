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
        <form className="add_contact" onSubmit={onSubmitHandler}>
            <label>
                <div>
                    <p>name:</p>
                </div>
                <div>
                    <input type="text" value={name} onChange={nameOnChangeHandler} />
                </div>
            </label>
            <label>
                <div>
                    <p>number:</p>
                </div>
                <div>
                    <input type="text" value={phone} onChange={phoneOnChangeHandler} />
                </div>
            </label>
            <Button label="add" type="submit"/>
        </form>
    )
}

export default Form;