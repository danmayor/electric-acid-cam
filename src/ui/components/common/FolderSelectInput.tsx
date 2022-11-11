import * as React from 'react';
import { FaFolder } from 'react-icons/fa';
import { FormGroup } from 'reactstrap';

export interface FolderSelectInputProps {
    className?: string;
    error?: string;
    label: React.ReactNode | string;
    onClick: () => void;
    value?: string;
}

// Todo:
//  need to implement a modal that interacts with app via IPC to make a folder picker
const FolderSelectInput: React.FC<FolderSelectInputProps> = (props: FolderSelectInputProps) => {
    return <FormGroup className={`form-group ${props.className}`}>
        <label className="input-label">{props.label}</label>
        <FaFolder className="form-control-icon" />
        <input className="form-control" onClick={props.onClick} role="button" type="text" value={props.value} />
        <div className="text-danger">{props.error ?? <>&nbsp;</>}</div>
    </FormGroup>
};

export default FolderSelectInput;
