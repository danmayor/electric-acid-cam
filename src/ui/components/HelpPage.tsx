import * as React from 'react';
import { MdHelp } from 'react-icons/md';
import PageHeader from './common/PageHeader';

const HelpPage: React.FC = () => {
    return <>
        <PageHeader
            icon={<MdHelp />}
            title='Help &amp; About'
            crumbs={[
                { active: true, url: '/help', label: 'Help' }
            ]}
        />

        <h2>About Electric Acid Cam</h2>
        More information coming soon, this is an early work in progress.
    </>;
};

export default HelpPage;
