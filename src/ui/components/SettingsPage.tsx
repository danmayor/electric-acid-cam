import * as React from 'react';
import { MdOutlineSettingsApplications } from 'react-icons/md';
import { Card, CardBody, CardFooter, CardHeader, Col, Input, Row } from 'reactstrap';
import AppSettings from '../../common/AppSettings';
import FolderSelectInput from './common/FolderSelectInput';
import PageHeader from './common/PageHeader';

/**
 * Derrived from AppSettings, we add an isLoading indicator.
 * This is the "State" we use on this page
 */
interface SettingsPageState extends AppSettings {
    isLoading?: boolean;
}

/**
 * Condigure out initial state values
 */
const initialSettingsPageState: SettingsPageState = {
    acidCamPath: '',
    capturePath: '',
}

/**
 * Renders our Settings page
 * @returns SettingsPage component
 */
const SettingsPage: React.FC = () => {
    const [state, setState] = React.useState(initialSettingsPageState);

    /**
     * This will run when we first enter the Settings page, it loads our AppSettings
     * from ./.appsettings file, or will load up the defaults
     */
    React.useEffect(() => {
        setState({ ...state, isLoading: true });

        const getAppSettings = async () => {
            const appSettings = await window.app.loadAppSettings();
            console.log('Loaded appsettings');
            console.log(appSettings);

            setState(appSettings);
        }

        getAppSettings();
    }, []);

    /**
     * Launches an OS folder picker dialog and sets the selected value
     * into the state.acidCamPath (which is rendered on the screen)
     */
    const onAcidCamPathClick = React.useCallback(async () => {
        const res = await window.app.selectFolder();

        if (!res.canceled) {
            setState({
                ...state,
                acidCamPath: res.filePaths[0]
            });
        }
    }, [state, setState]);

    /**
     * Launches an OS folder picker dialog and sets the selected value
     * into the state.capturePath (which is rendered on the screen)
     */
    const onCapturePathClick = React.useCallback(async () => {
        const res = await window.app.selectFolder();

        if (!res.canceled) {
            setState({
                ...state,
                capturePath: res.filePaths[0]
            });
        }
    }, [state, setState]);

    /**
     * Saves the current state AppSettings to file
     */
    const onSaveClick = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await window.app.saveAppSettings(state);
    }, [state]);

    return <>
        <PageHeader
            icon={<MdOutlineSettingsApplications />}
            title='App settings'
            crumbs={[
                { active: true, url: '/settings', label: 'Settings' }
            ]}
        />

        <form onSubmit={onSaveClick}>
            <Card>
                <CardHeader>
                    <h2>Application Settings</h2>
                </CardHeader>

                <CardBody>
                    <Row>
                        <Col xs={12} sm={6}>
                            <FolderSelectInput
                                className="mb-2"
                                label="AcidCam path:"
                                onClick={onAcidCamPathClick}
                                value={state.acidCamPath}
                            />
                        </Col>

                        <Col xs={12} sm={6}>
                            <FolderSelectInput
                                className="mb-2"
                                label="Capture path:"
                                onClick={onCapturePathClick}
                                value={state.capturePath}
                            />
                        </Col>
                    </Row>

                </CardBody>

                <CardFooter className="text-end">
                    <button className="btn btn-primary">Save Changes</button>
                </CardFooter>
            </Card>
        </form>
    </>;
};

export default SettingsPage;
