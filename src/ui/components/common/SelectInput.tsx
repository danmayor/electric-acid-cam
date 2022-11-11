import * as React from 'react';
import { FaFolder } from 'react-icons/fa';
import { FormGroup, Input } from 'reactstrap';

export interface SelectInputOption {
    label: string;
    value: any;
}

export interface SelectInputProps {
    className?: string;
    error?: string;
    label: React.ReactNode | string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    options: SelectInputOption[];
    value?: any;
}

// Todo:
//  need to implement a modal that interacts with app via IPC to make a folder picker
const SelectInput: React.FC<SelectInputProps> = (props: SelectInputProps) => {
    console.log(props.value);

    return <FormGroup className={props.className}>
        <label className="input-label">{props.label}</label>
        <Input
            type="select"
            onChange={props.onChange}
        >
            {props.options.map(opt => {
                console.log(`Comparing '${props.value}' to '${opt.value}'`);
                return <option value={opt.value} selected={props.value == opt.value}>{opt.label}</option>;
            })}
        </Input>

        <div className="text-danger">{props.error ?? <>&nbsp;</>}</div>
    </FormGroup>
};

export default SelectInput;
