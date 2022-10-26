import * as React from 'react';
import { FaGreaterThan } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export interface PageHeaderProps {
    icon: React.Component | any;
    title: string;

    crumbs: [
        {
            active: boolean;
            url: string;
            label: string;
        }
    ]
}

const PageHeader: React.FC<PageHeaderProps> = (props: PageHeaderProps) => {
    return <>
        <h1 className="mt-4">
            {props.icon}&nbsp;{props.title}
        </h1>

        {props.crumbs.map(crumb => {
            <ol className="breadcrumb mb-4">
                <li className={`breadcrumb-item ${crumb.active ? 'active' : ''}`}>
                    <FaGreaterThan /> &nbsp; <Link to={crumb.url}>{crumb.label}</Link>
                </li>
            </ol>
        })}
    </>;
};

export default PageHeader;
