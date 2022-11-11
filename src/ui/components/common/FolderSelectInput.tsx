import * as React from 'react';
import { FaFolder } from 'react-icons/fa';
import { FormGroup } from 'reactstrap';

export interface FolderSelectInputProps {
    className?: string;
    error?: string;
    label: React.ReactNode | string;
    name?: string;
    onClick: (e: string) => void;
    value?: string;
}

/**
 * Simple file path selector component
 * 
 * @param props FolderSelectInputProps
 * @returns FolderSelectInput component
 */
const FolderSelectInput: React.FC<FolderSelectInputProps> = (props: FolderSelectInputProps) => {
    const onClick = React.useCallback(() => {
        props.onClick(props.name);
    }, [props.onClick])

    return <FormGroup className={`form-group ${props.className}`}>
        <label className="input-label">{props.label}</label>
        <FaFolder className="form-control-icon" />
        <input className="form-control" name={props.name} onClick={onClick} role="button" type="text" value={props.value} />
        <div className="text-danger">{props.error ?? <>&nbsp;</>}</div>
    </FormGroup>
};

export default FolderSelectInput;
