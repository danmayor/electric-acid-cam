import * as React from 'react';

export interface FolderSelectInputProps {
    className?: string;
    error?: string;
    label: React.ReactNode | string;
}

// Todo:
//  need to implement a modal that interacts with app via IPC to make a folder picker
const FolderSelectInput: React.FC<FolderSelectInputProps> = (props: FolderSelectInputProps) => {
    return <div className={props.className}>
        <label className="input-label">{props.label}</label>
        <input className="form-control" type="file" disabled={true} />
        <div className="text-danger">{props.error ?? <>&nbsp;</>}</div>
    </div>
};

export default FolderSelectInput;
