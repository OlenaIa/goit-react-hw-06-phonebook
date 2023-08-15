import { useState } from "react";
import { FormStyle } from "./Form.styled";
import { InputStyle, LabelStyle, ButtonStyle } from "components/App.styled";
import PropTypes from 'prop-types'

export const Form = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const onSubmitAddContact = (event) => {
        event.preventDefault();
        const data = { name, number };
        onSubmit(data);
        reset();
    };

    const onChangeInput = (event) => {
        const { name, value } = event.currentTarget;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
        
            default:
                break;
        };
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <FormStyle onSubmit={onSubmitAddContact}>
            <LabelStyle>
                Name
                <InputStyle
                    type="text"
                    name="name"
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$" title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={onChangeInput}
                />
            </LabelStyle>
            <LabelStyle>
                Phone number
                <InputStyle
                    type="tel"
                    name="number"
                    value={number}
                    pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}" title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={onChangeInput}
                />
            </LabelStyle>
            <ButtonStyle type="submit">
                Add contact
            </ButtonStyle>
        </FormStyle>
    );
};

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired
};