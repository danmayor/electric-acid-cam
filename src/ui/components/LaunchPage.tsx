import * as React from 'react';
import { MdVideoSettings } from 'react-icons/md';
import { Button } from 'reactstrap';
import PageHeader from './common/PageHeader';

const LaunchPage: React.FC = () => {
    /**
     * Example for now, showing how to call our program API methods
     * (The stuff defined in AppApi.ts / preloader.ts)
     */
    
    const onLaunchClick = React.useCallback(() => {
        const command = {
            path: 'path',
            props: ['a', 'b', 'c']
        };

        window.app.launchAcidCam(command);
    }, []);

    return <>
        <PageHeader
            icon={<MdVideoSettings />}
            title='Launch Acid Cam'
            crumbs={[
                { active: true, url: '/launcher', label: 'Launcher' }
            ]}
        />

        <h2>Acid Cam Options:</h2>
        Coming soon<br /><br />
        
        <Button className="btn-success" onClick={onLaunchClick}>Launch AcidCam!</Button>
    </>;
};

export default LaunchPage;
