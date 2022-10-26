import * as React from 'react';
import { MdOutlineSettingsApplications } from 'react-icons/md';
import PageHeader from './common/PageHeader';

const SettingsPage: React.FC = () => {
    return <>
        <PageHeader
            icon={<MdOutlineSettingsApplications />}
            title='App settings'
            crumbs={[
                { active: true, url: '/settings', label: 'Settings' }
            ]}
        />

        <h2>Electric Acid Cam Launcher Settings</h2>
        Coming soon
    </>;
};

export default SettingsPage;
