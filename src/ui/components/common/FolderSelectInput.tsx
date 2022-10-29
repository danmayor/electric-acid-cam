import * as React from 'react';
import { FaFolder } from 'react-icons/fa';

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
    return <div className={`form-group ${props.className}`}>
        <label className="input-label">{props.label}</label>
        <FaFolder className="form-control-icon" />
        <input className="form-control" onClick={props.onClick} role="button" type="text" value={props.value} />
        <div className="text-danger">{props.error ?? <>&nbsp;</>}</div>
    </div>
};

export default FolderSelectInput;
