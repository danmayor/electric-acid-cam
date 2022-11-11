import * as React from 'react';
import { FormGroup, Input } from 'reactstrap';

export interface SelectInputOption {
    label: string;
    value: any;
}

export interface SelectInputProps {
    className?: string;
    error?: string;
    label: React.ReactNode | string;
    name?: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    options: SelectInputOption[];
    value?: any;
}

/**
 * A simple combo box select input
 * 
 * @param props SelectInputProps
 * @returns SelectInput component
 */
const SelectInput: React.FC<SelectInputProps> = (props: SelectInputProps) => {
    return <FormGroup className={props.className}>
        <label className="input-label">{props.label}</label>

        <Input
            name={props.name}
            onChange={props.onChange}
            type="select"
        >
            {props.options.map(opt => {
                return <option value={opt.value} selected={props.value == opt.value}>{opt.label}</option>;
            })}
        </Input>

        <div className="text-danger">{props.error ?? <>&nbsp;</>}</div>
    </FormGroup>
};

export default SelectInput;
