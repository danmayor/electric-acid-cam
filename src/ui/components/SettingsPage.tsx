import { LogLevel } from '@digivance/applogger/applogger';
import * as React from 'react';
import { MdOutlineSettingsApplications } from 'react-icons/md';
import { Card, CardBody, CardFooter, CardHeader, Col, Input, Row, Toast, ToastBody } from 'reactstrap';
import AppSettings from '../../common/AppSettings';
import FolderSelectInput from './common/FolderSelectInput';
import PageHeader from './common/PageHeader';
import SelectInput from './common/SelectInput';

/**
 * Derrived from AppSettings, we add an isLoading indicator.
 * This is the "State" we use on this page
 */
interface SettingsPageState extends AppSettings {
    errorText?: string;
    isLoading?: boolean;
    successText?: string;
}

/**
 * Condigure out initial state values
 */
const initialSettingsPageState: SettingsPageState = {
    acidCamPath: '',
    capturePath: '',
    logPath: '',
    logLevel: LogLevel.info,
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
        const getAppSettings = async () => {
            const appSettings = await window.app.getAppSettings();
            setState({
                ...state,
                ...appSettings,
                successText: undefined // no clue why we have to force this here
            });
        }

        getAppSettings();
    }, []);
    
    /**
     * Handles numeric state value changes
     */
    const onNumberChange = React.useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.currentTarget.name]: Number.parseInt(e.currentTarget.value)
        });
    }, [state, setState]);

    /**
     * Displays the OS folder picker and sets selection to state
     */
    const onPathChange = React.useCallback(async (name: string) => {
        const res = await window.app.selectFolder();

        if (!res.canceled) {
            setState({
                ...state,
                [name]: res.filePaths[0]
            });
        }
    }, [state, setState]);

    /**
     * Saves the current state AppSettings to file
     */
    const onSaveClick = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setState({
            ...state,
            isLoading: true
        });

        try {
            await window.app.saveAppSettings(state);
            setState({
                ...state,
                isLoading: false,
                successText: 'App settings saved'
            });
        } catch (err) {
            console.log(err);
            setState({
                ...state,
                isLoading: false,
                errorText: 'Failed to save appsettings'
            });
        }

        setTimeout(() => {
            setState({
                ...state,
                errorText: undefined,
                successText: undefined
            });
        }, 1500);
    }, [state, setState]);

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
                    <h3>Application Settings</h3>
                </CardHeader>

                <CardBody>
                    <Row>
                        <Col xs={12} sm={6}>
                            <FolderSelectInput
                                className="mb-2"
                                label="AcidCam path:"
                                name="acidCamPath"
                                onClick={onPathChange}
                                value={state.acidCamPath}
                            />
                        </Col>

                        <Col xs={12} sm={6}>
                            <FolderSelectInput
                                className="mb-2"
                                label="Capture path:"
                                name="capturePath"
                                onClick={onPathChange}
                                value={state.capturePath}
                            />
                        </Col>
                    </Row>

                </CardBody>
            </Card>

            <Card className="mt-5">
                <CardHeader>
                    <h3>Log Settings:</h3>
                </CardHeader>

                <CardBody>
                    <Row>
                        <Col xs={12} sm={6}>
                            <FolderSelectInput
                                className="mb-2"
                                label="Log Path:"
                                name="logPath"
                                onClick={onPathChange}
                                value={state.logPath}
                            />
                        </Col>

                        <Col xs={12} sm={6}>
                            <SelectInput
                                label="Log Level"
                                name="logLevel"
                                onChange={onNumberChange}
                                options={[
                                    { label: 'Trace', value: 0 },
                                    { label: 'Debug', value: 1 },
                                    { label: 'Info', value: 2 },
                                    { label: 'Warning', value: 3 },
                                    { label: 'Error', value: 4 },
                                    { label: 'Critical', value: 5 }
                                ]}
                                value={state.logLevel}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <footer className="fixed-bottom text-end me-5 mb-3">
                <div className="mb-3">
                    {state.errorText && <span className="alert alert-danger">{state.errorText}</span>}
                    {state.successText && <span className="alert alert-success">{state.successText}</span>}
                </div>

                <button className="btn btn-success" disabled={state.isLoading}>Save Changes</button>
            </footer>
        </form>
    </>;
};

export default SettingsPage;
