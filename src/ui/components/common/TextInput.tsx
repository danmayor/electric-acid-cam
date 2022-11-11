import * as React from 'react';

export interface TextInputProps {
    className?: string;
    error?: string;
    label: React.ReactNode | string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    value?: string;
}

const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
    return <div className={props.className}>
        <label className="input-label">{props.label}</label>

        <input
            className="form-control"
            type="text"
            value={props.value}
            onChange={props.onChange}
        />

        <div className="text-danger">{props.error ?? <>&nbsp;</>}</div>
    </div>
};

export default TextInput;
