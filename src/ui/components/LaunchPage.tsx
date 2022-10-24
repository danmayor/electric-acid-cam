import * as React from 'react';
import { MdVideoSettings } from 'react-icons/md';
import { Button } from 'reactstrap';

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
        <h1>
            <MdVideoSettings />&nbsp;
            Launcher page
        </h1>
        <Button className="btn-success" onClick={onLaunchClick}>Launch AcidCam!</Button>
    </>;
};

export default LaunchPage;
