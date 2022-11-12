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

    const onBooleanChange = React.useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        const currentValue = state[e.currentTarget.name] as boolean;

        setState({
            ...state,
            [e.currentTarget.name]: !currentValue
        });
    }, [state, setState]);

    const onNumberChange = React.useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.currentTarget.name]: Number.parseInt(e.currentTarget.value)
        });
    }, [state, setState]);

    const onStringChange = React.useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }, [state, setState]);

    const onPathChange = React.useCallback(async (name: string) => {
        const res = await window.app.selectFolder();

        if (!res.canceled) {
            setState({
                ...state,
                [name]: res.filePaths[0]
            });
        }
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
                                name="inputMode"
                                onChange={onStringChange}
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
                                onChange={onNumberChange}
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
                                name="videoFilename"
                                onClick={onPathChange}
                                value={state.videoFilename}
                            />}
                        </Col>

                        <Col xs={12} sm={4}>
                            {state.inputMode === 'capture' && <SelectInput
                                label="Resolution:"
                                name="deviceResolution"
                                onChange={onStringChange}
                                options={[ // TODO: use IPC to get available capture devices?
                                    { label: '800x600', value: '800x600' },
                                    { label: '1024x768', value: '1024x768' }
                                ]}
                                value={state.deviceResolution}
                            />}

                            {state.inputMode === 'file' && <SwitchInput
                                label="Repeat:"
                                name="videoFileRepeat"
                                onChange={onBooleanChange}
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
                                name="shaderPath"
                                onClick={onPathChange}
                                value={state.shaderPath}
                            />
                        </Col>

                        <Col xs={12} sm={2}>
                            <NumericInput
                                label="Shader index:"
                                name="shaderIndex"
                                onChange={onNumberChange}
                                value={state.shaderIndex}
                            />
                        </Col>

                        <Col xs={12} sm={2}>
                            <NumericInput
                                label="Filter index:"
                                name="filterIndex"
                                onChange={onNumberChange}
                                value={state.filterIndex}
                            />
                        </Col>

                        <Col xs={12} sm={2}>
                            <NumericInput
                                label="Start at index:"
                                name="startAtIndex"
                                onChange={onNumberChange}
                                value={state.startAtIndex}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col cs={12} sm={4}>
                            <FolderSelectInput
                                label="Material:"
                                name="shaderMaterial"
                                onClick={onPathChange}
                                value={state.shaderMaterial}
                            />
                        </Col>

                        <Col cs={12} sm={4}>
                            <FolderSelectInput
                                label="Playlist:"
                                name="shaderPlaylist"
                                onClick={onPathChange}
                                value={state.shaderPlaylist}
                            />
                        </Col>

                        <Col cs={12} sm={4}>
                            <FolderSelectInput
                                label="Auto filter:"
                                name="shaderAutoFilter"
                                onClick={onPathChange}
                                value={state.shaderAutoFilter}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} sm={2}>
                            <SwitchInput
                                label="Enable playback:"
                                name="enablePlayback"
                                onChange={onBooleanChange}
                                value={state.enablePlayback}
                            />
                        </Col>

                        <Col xs={12} sm={2}>
                            <NumericInput
                                label="Beats per minute:"
                                name="beatsPerMinute"
                                onChange={onNumberChange}
                                value={state.beatsPerMinute}
                            />
                        </Col>

                        <Col xs={12} sm={2}>
                            <SwitchInput
                                label="Platlist shuffle:"
                                name="playlistShuffle"
                                onChange={onBooleanChange}
                                value={state.playlistShuffle}
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
                                name="windowResolution"
                                onChange={onStringChange}
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
                                onChange={onBooleanChange}
                                value={state.isFullscreen}
                            />
                        </Col>

                        <Col xs={12} sm={2}>
                            <SwitchInput
                                label="Can Resize:"
                                name="canResize"
                                onChange={onBooleanChange}
                                value={state.canResize}
                            />
                        </Col>

                        <Col xs={12} sm={2}>
                            <SelectInput
                                label="Monitor:"
                                name="outputMonitor"
                                onChange={onNumberChange}
                                options={[ // TODO: use IPC to get available capture devices?
                                    { label: '0', value: 0 },
                                    { label: '1', value: 1 }
                                ]}
                                value={state.outputMonitor}
                            />
                        </Col>

                        <Col xs={12} sm={2}>
                            <NumericInput
                                label="FPS"
                                name="outputFps"
                                onChange={onNumberChange}
                                value={state.outputFps}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} sm={4}>
                            <FolderSelectInput
                                label="Output folder:"
                                name="outputFolder"
                                onClick={onPathChange}
                                value={state.outputFolder}
                            />
                        </Col>

                        <Col xs={12} sm={4}>
                            <SelectInput
                                label="Record at:"
                                name="outputAt"
                                onChange={onStringChange}
                                options={[ // TODO: use IPC to get available capture devices?
                                    { label: 'x264', value: 'x264' },
                                    { label: 'x265', value: 'x265' }
                                ]}
                                value={state.outputAt}
                            />
                        </Col>

                        <Col xs={12} sm={2}>
                            <NumericInput
                                label="CRF"
                                name="outputCrf"
                                onChange={onNumberChange}
                                value={state.outputCrf}
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
