import * as React from 'react';
import { FaGreaterThan } from 'react-icons/fa';
import { Link } from 'react-router-dom';

/**
 * Required Properties for page header
 */
export interface PageHeaderProps {
    /**
     * Optional icon component to render in the page header
     */
    icon?: React.Component | any;

    /**
     * Title to display in the page header
     */
    title: string;

    /**
     * Breadcrumbs, an array of one or more:
     */
    crumbs: [
        {
            /**
             * True for the active crumb (the one we're on)
             */
            active: boolean;

            /**
             * Url of this crumb
             */
            url: string;

            /**
             * Label to display for this crumb
             */
            label: string;
        }
    ]
}

/**
 * A common page header
 * 
 * @param props PageHeaderProps controlling how to render this component
 * 
 * @returns PageHeader component
 */
const PageHeader: React.FC<PageHeaderProps> = (props: PageHeaderProps) => {
    return <div className="pb-3">
        <h1 className="mt-4">
            {props.icon}&nbsp;{props.title}
        </h1>

        {props.crumbs.map(crumb => 
            <ol className="breadcrumb mb-4">
                <li className={`breadcrumb-item ps-2 ${crumb.active ? 'active' : ''}`}>
                    <FaGreaterThan />
                    <Link className="ps-2" to={crumb.url}>{crumb.label}</Link>
                </li>
            </ol>
        )}
    </div>;
};

export default PageHeader;
