import * as React from 'react';

export interface TextInputProps {
    className?: string;
    error?: string;
    label: React.ReactNode | string;
    name?: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    value?: string;
}

const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
    return <div className={props.className}>
        <label className="input-label">{props.label}</label>

        <input
            className="form-control"
            name={props.name}
            onChange={props.onChange}
            type="text"
            value={props.value}
        />

        <div className="text-danger">{props.error ?? <>&nbsp;</>}</div>
    </div>
};

export default TextInput;
