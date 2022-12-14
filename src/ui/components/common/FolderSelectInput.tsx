import * as React from 'react';
import { FaFolder } from 'react-icons/fa';
import { FormGroup } from 'reactstrap';

export interface FolderSelectInputProps {
    className?: string;
    error?: string;
    label: React.ReactNode | string;
    name?: string;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    value?: string;
}

/**
 * Simple file path selector component
 * 
 * @param props FolderSelectInputProps
 * @returns FolderSelectInput component
 */
const FolderSelectInput: React.FC<FolderSelectInputProps> = (props: FolderSelectInputProps) => {
    const handleSelect = React.useCallback(async () => {
        const res = await window.app.selectFolder();

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
        <FaFolder className="form-control-picker ps-1" onClick={handleSelect} role="button" />
        <input className="form-control" name={props.name} onChange={props.onChange} type="text" value={props.value} />
        <div className="text-danger">{props.error ?? <>&nbsp;</>}</div>
    </FormGroup>
};

export default FolderSelectInput;
