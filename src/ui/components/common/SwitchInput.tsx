import * as React from 'react';
import { FormGroup } from 'reactstrap';

export interface SwitchInputProps {
    label: string;
    name: string;
    onChange: () => void;
    value: boolean;
};

const SwitchInput: React.FC<SwitchInputProps> = (props: SwitchInputProps) => {
    return <FormGroup>
        <label className="input-label">{props.label}</label>

        <input
            className="react-switch-checkbox"
            checked={props.value}
            id={`react-switch-new-${props.name}`}
            onChange={props.onChange}
            type="checkbox"
        />

        <label
            className="react-switch-label"
            htmlFor={`react-switch-new-${props.name}`}
        >
            <span className={`react-switch-button`} />
        </label>
    </FormGroup>;
};

export default SwitchInput;
