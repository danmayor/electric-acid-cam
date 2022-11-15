import * as React from 'react';
import { FaFile } from 'react-icons/fa';
import { FormGroup } from 'reactstrap';

export interface FileSelectInputProps {
    className?: string;
    error?: string;
    label: React.ReactNode | string;
    name?: string;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    value?: string;
}

/**
 * Simple file selector component
 * 
 * @param props FileSelectInputProps
 * @returns FileSelectInput component
 */
const FileSelectInput: React.FC<FileSelectInputProps> = (props: FileSelectInputProps) => {
    const handleSelect = React.useCallback(async () => {
        const res = await window.app.selectFile();

        if (!res.canceled) {
            const e = {
                currentTarget: {
                    name: props.name,
                    value: res.filePaths[0]
                }
            } as React.FormEvent<HTMLInputElement>;

            props.onChange(e);
        }
    }, [props, props.name])

    return <FormGroup className={`form-group ${props.className}`}>
        <label className="input-label">{props.label}</label>
        <FaFile className="form-control-picker" onClick={handleSelect} role="button" />
        <input className="form-control" name={props.name} onChange={props.onChange} type="text" value={props.value} />
        <div className="text-danger">{props.error ?? <>&nbsp;</>}</div>
    </FormGroup>
};

export default FileSelectInput;
