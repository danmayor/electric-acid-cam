import * as React from 'react';

export interface NumericInputProps {
    className?: string;
    error?: string;
    label: React.ReactNode | string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    value?: number
}

const NumericInput: React.FC<NumericInputProps> = (props: NumericInputProps) => {
    return <div className={props.className}>
        <label className="input-label">{props.label}</label>

        <input
            className="form-control"
            type="number"
            value={props.value}
            onChange={props.onChange}
        />

        <div className="text-danger">{props.error ?? <>&nbsp;</>}</div>
    </div>
};

export default NumericInput;
