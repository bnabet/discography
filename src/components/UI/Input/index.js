import React from 'react';

import Wrapper from '../../../hoc/Wrapper';

import './style.css';

const input = props => {
    let inputElement;
    //const inputClasses = [classes.InputElement];

    /*if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }*/

    switch (props.elementType) {
        case ('input'):
            if (props.attributes.type === 'checkbox') {
                inputElement = (
                    props.attributes.options.map(checkbox => (
                        <div className="editor-group" key={checkbox.value}>
                            <input type="checkbox"
                                value={checkbox.value}
                                onChange={props.onChange}
                                checked={checkbox.checked}
                            />
                            <label className="form-label checkbox-label">{checkbox.displayValue}</label>
                        </div>
                    ))
                );
            } else {
                inputElement = (
                    <input
                        {...props.attributes}
                        value={props.value}
                        onChange={props.onChange}
                    />
                );
            }
            break;
        default:
            inputElement = (
                <input
                    {...props.attributes}
                    value={props.value}
                    onChange={props.onChange}
                />
            );
    }

    return (
        <Wrapper>
            <label className="form-label">{props.label}</label>
            {inputElement}
        </Wrapper>
    );
};

export default input;