import React from 'react';

export default ({size = 's12', label, input, autoComplete = "off", type = 'text', meta: { touched, error }}) => {
    return (
        <div className = {`input-field col ${size}`}>
            <input {...input} type= {type} autoComplete = {autoComplete} id = {input.name}/>
            <label className = {input.value ? 'active' : ''} htmlFor= {input.name}>{label}</label>
            <div className="input-error red-text text-darken-2">{touched && error}</div>
        </div>
    );
};