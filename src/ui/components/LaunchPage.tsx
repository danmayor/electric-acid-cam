import * as React from 'react';
import { MdVideoSettings } from 'react-icons/md';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import LaunchRequest, { DefaultLaunchRequest } from '../../common/ipc/LaunchRequest';
import FolderSelectInput from './common/FolderSelectInput';
import NumericInput from './common/NumericInput';
import PageHeader from './common/PageHeader';
import SelectInput from './common/SelectInput';
import SwitchInput from './common/SwitchInput';

interface LaunchPageState extends LaunchRequest { }

const LaunchPage: React.FC = () => {
    const [state, setState] = React.useState(DefaultLaunchRequest as LaunchPageState);

    /**
     * Example for now, showing how to call our program API methods
     * (The stuff defined in AppApi.ts / preloader.ts)
     */
    const onLaunchClick = React.useCallback(() => {
        window.app.launchAcidCam(state);
    }, []);

    const onCanResizeChange = React.useCallback(async () => {
        setState({
            ...state,
            canResize: !state.canResize
        });
    }, [state, setState]);

    const onDeviceIndexChange = React.useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        setState({
            ...state,
            deviceIndex: Number.parseInt(e.currentTarget.value)
        });
    }, [state, setState]);

    const onDeviceResolutionChange = React.useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        setState({
            ...state,
            deviceResolution: e.currentTarget.value
        });
    }, [state, setState]);

    const onFilterIndexChange = React.useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        setState({
            ...state,
            filterIndex: Number.parseInt(e.currentTarget.value)
        });
    }, [state, setState]);

    const onInputModeChange = React.useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        setState({
            ...state,
            inputMode: e.currentTarget.value as 'capture' | 'file'
        });
    }, [state, setState]);

    const onIsFullscreenChange = React.useCallback(async () => {
        setState({
            ...state,
            isFullscreen: !state.isFullscreen
        });
    }, [state, setState]);

    const onOutputFpsChange = React.useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        setState({
            ...state,
            outputFps: Number.parseInt(e.currentTarget.value)
        });
    }, [state, setState]);

    const onOutputMonitorChange = React.useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        setState({
            ...state,
            outputMonitor: Number.parseInt(e.currentTarget.value)
        });
    }, [state, setState]);

    const onShaderIndexChange = React.useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        setState({
            ...state,
            shaderIndex: Number.parseInt(e.currentTarget.value)
        });
    }, [state, setState]);

    const onShaderPathChange = React.useCallback(async () => {
        const res = await window.app.selectFolder();

        if (!res.canceled) {
            setState({
                ...state,
                shaderPath: res.filePaths[0]
            });
        }
    }, [state, setState]);

    const onStartAtIndexChange = React.useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        setState({
            ...state,
            startAtIndex: Number.parseInt(e.currentTarget.value)
        });
    }, [state, setState]);

    /**
     * Launches an OS folder picker dialog and sets the selected value
     * into the state.capturePath (which is rendered on the screen)
     */
    const onVideoFilenameChange = React.useCallback(async () => {
        const res = await window.app.selectFolder();

        if (!res.canceled) {
            setState({
                ...state,
                videoFilename: res.filePaths[0]
            });
        }
    }, [state, setState]);

    const onVideoFileRepeatChange = React.useCallback(async () => {
        setState({
            ...state,
            videoFileRepeat: !state.videoFileRepeat
        });
    }, [state, setState]);

    const onWindowResolutionChange = React.useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        setState({
            ...state,
            windowResolution: e.currentTarget.value
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

        <form>
            <Card>
                <CardHeader>
                    <h3>Input Options:</h3>
                </CardHeader>

                <CardBody>
                    <Row>
                        <Col xs={12} sm={4}>
                            <SelectInput
                                label="Mode:"
                                onChange={onInputModeChange}
                                options={[ // TODO: use IPC to get available capture devices?
                                    { label: 'Capture', value: 'capture' },
                                    { label: 'Video File', value: 'file' }
                                ]}
                                value={state.inputMode}
                            />
                        </Col>

                        <Col xs={12} sm={4}>
                            {state.inputMode === 'capture' && <SelectInput
                                label="Device Index:"
                                onChange={onDeviceIndexChange}
                                options={[ // TODO: use IPC to get available capture devices?
                                    { label: '0', value: 0 },
                                    { label: '1', value: 1 },
                                    { label: '2', value: 2 },
                                    { label: '3', value: 3 }
                                ]}
                                value={state.deviceIndex}
                            />}

                            {state.inputMode === 'file' && <FolderSelectInput
                                label="Video Filename:"
                                onClick={onVideoFilenameChange}
                                value={state.videoFilename}
                            />}
                        </Col>

                        <Col xs={12} sm={4}>
                            {state.inputMode === 'capture' && <SelectInput
                                label="Resolution:"
                                onChange={onDeviceResolutionChange}
                                options={[ // TODO: use IPC to get available capture devices?
                                    { label: '800x600', value: '800x600' },
                                    { label: '1024x768', value: '1024x768' }
                                ]}
                                value={state.deviceResolution}
                            />}

                            {state.inputMode === 'file' && <SwitchInput
                                label="Repeat:"
                                name="videoFileRepeat"
                                onChange={onVideoFileRepeatChange}
                                value={state.videoFileRepeat}
                            />}
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card className="mt-3">
                <CardHeader>
                    <h3>Shader Options:</h3>
                </CardHeader>

                <CardBody>
                    <Row>
                        <Col xs={12} sm={4}>
                            <FolderSelectInput
                                label="Shader path:"
                                onClick={onShaderPathChange}
                                value={state.shaderPath}
                            />
                        </Col>

                        <Col xs={12} sm={2}>
                            <NumericInput
                                label="Shader index:"
                                onChange={onShaderIndexChange}
                                value={state.shaderIndex}
                            />
                        </Col>

                        <Col xs={12} sm={2}>
                            <NumericInput
                                label="Filter index:"
                                onChange={onFilterIndexChange}
                                value={state.filterIndex}
                            />
                        </Col>

                        <Col xs={12} sm={2}>
                            <NumericInput
                                label="Start at index:"
                                onChange={onStartAtIndexChange}
                                value={state.startAtIndex}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card className="mt-3">
                <CardHeader>
                    <h3>Output Options:</h3>
                </CardHeader>

                <CardBody>
                    <Row>
                        <Col xs={12} sm={4}>
                            <SelectInput
                                label="Window resolution:"
                                onChange={onWindowResolutionChange}
                                options={[ // TODO: use IPC to get available capture devices?
                                    { label: '800x600', value: '800x600' },
                                    { label: '1024x768', value: '1024x768' }
                                ]}
                                value={state.windowResolution}
                            />
                        </Col>

                        <Col xs={12} sm={2}>
                            <SwitchInput
                                label="Full screen:"
                                name="isFullScreen"
                                onChange={onIsFullscreenChange}
                                value={state.isFullscreen}
                            />
                        </Col>

                        <Col xs={12} sm={2}>
                            <SwitchInput
                                label="Can Resize:"
                                name="canResize"
                                onChange={onCanResizeChange}
                                value={state.canResize}
                            />
                        </Col>

                        <Col xs={12} sm={2}>
                            <SelectInput
                                label="Monitor:"
                                onChange={onOutputMonitorChange}
                                options={[ // TODO: use IPC to get available capture devices?
                                    { label: '0', value: '0' },
                                    { label: '1', value: '1' }
                                ]}
                                value={state.outputMonitor}
                            />
                        </Col>

                        <Col xs={12} sm={2}>
                            <NumericInput
                                label="FPS"
                                onChange={onOutputFpsChange}
                                value={state.outputFps}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <footer className="bg-white fixed-bottom mb-3 me-5 text-end">
                <Button className="btn-success" onClick={onLaunchClick}>Launch AcidCam!</Button>
            </footer>
        </form>
    </>;
};

export default LaunchPage;
