import * as React from 'react';
import { MdVideoSettings } from 'react-icons/md';
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import LaunchRequest, { DefaultLaunchRequest } from '../../common/LaunchRequest';
import LaunchInputOptions from './LaunchPage/LaunchInputOptions';
import PageHeader from './common/PageHeader';
import LaunchShaderOptions from './LaunchPage/LaunchShaderOptions';
import LaunchOutputOptions from './LaunchPage/LaunchOutputOptions';

interface LaunchPageState extends LaunchRequest {
    currentTab: string;
}

const LaunchPageTabs = {
    input: 'input',
    shader: 'shader',
    output: 'output'
}

const LaunchPage: React.FC = () => {
    const [state, setState] = React.useState({
        ...DefaultLaunchRequest,
        currentTab: LaunchPageTabs.input
    } as LaunchPageState);

    /**
     * Example for now, showing how to call our program API methods
     * (The stuff defined in AppApi.ts / preloader.ts)
     */
    const onLaunchClick = React.useCallback(() => {
        window.app.launchAcidCam(state);
    }, [state]);

    /**
     * Allows a tab component input to request os folder picker
     */
    const handleFilePicker = React.useCallback(async (name: string) => {
        const res = await window.app.selectFile();

        if (!res.canceled) {
            setState({
                ...state,
                [name]: res.filePaths[0]
            });
        }
    }, [state, setState]);

    /**
     * Allows a tab component input to request os folder picker
     */
    const handleFolderPicker = React.useCallback(async (name: string) => {
        const res = await window.app.selectFolder();

        if (!res.canceled) {
            setState({
                ...state,
                [name]: res.filePaths[0]
            });
        }
    }, [state, setState]);

    /**
     * Applies changes from tab components to page state
     */
    const handleSetLaunchRequest = React.useCallback((launchRequest: LaunchRequest) => {
        setState({
            ...state,
            ...launchRequest
        });
    }, [state, setState]);

    /**
     * Handles our tabs
     */
    const handleTabChange = React.useCallback((newTab: string) => {
        setState({
            ...state,
            currentTab: newTab
        });
    }, [state, setState]);

    return <>
        <PageHeader
            icon={<MdVideoSettings />}
            title='Launch Acid Cam'
            crumbs={[
                { active: true, url: '/launcher', label: 'Launcher' }
            ]}
        />

        <div>
            <Nav tabs className="mb-3">
                <NavItem>
                    <NavLink
                        active={state.currentTab === LaunchPageTabs.input}
                        onClick={() => handleTabChange(LaunchPageTabs.input)}
                        role="button"
                    >
                        Input Options
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        active={state.currentTab === LaunchPageTabs.shader}
                        onClick={() => handleTabChange(LaunchPageTabs.shader)}
                        role="button"
                    >
                        Shader Options
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        active={state.currentTab === LaunchPageTabs.output}
                        onClick={() => handleTabChange(LaunchPageTabs.output)}
                        role="button"
                    >
                        Output Options
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={state.currentTab}>
                <TabPane tabId={LaunchPageTabs.input}>
                    <LaunchInputOptions
                        launchRequest={state}
                        setLaunchRequest={handleSetLaunchRequest}
                    />
                </TabPane>

                <TabPane tabId={LaunchPageTabs.shader}>
                    <LaunchShaderOptions
                        launchRequest={state}
                        setLaunchRequest={handleSetLaunchRequest}
                    />
                </TabPane>

                <TabPane tabId={LaunchPageTabs.output}>
                    <LaunchOutputOptions
                    />
                </TabPane>
            </TabContent>
        </div>

        <form>
            <footer className="bg-white fixed-bottom mb-3 me-5 text-end">
                <Button className="btn-success" onClick={onLaunchClick}>Launch AcidCam!</Button>
            </footer>
        </form>
    </>;
};

export default LaunchPage;
