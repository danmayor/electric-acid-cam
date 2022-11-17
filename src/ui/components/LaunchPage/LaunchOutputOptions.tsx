import * as React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import LaunchRequest from '../../../common/LaunchRequest';
import FolderSelectInput from '../common/FolderSelectInput';
import NumericInput from '../common/NumericInput';
import SelectInput from '../common/SelectInput';
import SwitchInput from '../common/SwitchInput';
import TextInput from '../common/TextInput';

export interface LaunchOutputOptionsProps {
    launchRequest: LaunchRequest;
    setLaunchRequest: (launchRequest: LaunchRequest) => void;
}

const LaunchOutputOptions: React.FC<LaunchOutputOptionsProps> = (props: LaunchOutputOptionsProps) => {
    const { launchRequest, setLaunchRequest } = props;

    /**
     * Internal handler that will call our props.setLaunchRequest
     */
    const handleChange = React.useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        if (launchRequest[e.currentTarget.name] === true || launchRequest[e.currentTarget.name] === false) {
            setLaunchRequest({
                ...launchRequest,
                [e.currentTarget.name]: !launchRequest[e.currentTarget.name]
            });
        } else {
            setLaunchRequest({
                ...launchRequest,
                [e.currentTarget.name]: e.currentTarget.value
            });
        }
    }, [launchRequest, setLaunchRequest]);

    return <>
        <Card>
            <CardBody>
                <Row>
                    <Col xs={12} sm={4}>
                        <TextInput
                            label="Output Filename:"
                            name="outputFilename"
                            onChange={handleChange}
                            value={launchRequest.outputFilename}
                        />
                    </Col>

                    <Col xs={12} sm={4}>
                        <SelectInput
                            label="Output Format:"
                            name="outputImageFormat"
                            onChange={handleChange}
                            options={[
                                { label: 'mpeg', value: 'mpg' },
                                { label: 'tiff', value: 'tif' },
                                { label: 'jpeg', value: 'jpg' },
                                { label: 'png', value: 'png' }
                            ]}
                            value={launchRequest.outputImageFormat}
                        />
                    </Col>

                    <Col xs={12} sm={4}>
                        <SelectInput
                            label="Output Resolution:"
                            name="outputResolution"
                            onChange={handleChange}
                            options={[
                                { label: '600x400', value: '600x400' },
                                { label: '800x600', value: '800x600' },
                                { label: '1024x768', value: '1024x768' },
                                { label: '1280x720', value: '1280x720' }
                            ]}
                            value={launchRequest.outputResolution}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} sm={2}>
                        <NumericInput
                            label="FPS:"
                            name="fps"
                            onChange={handleChange}
                            value={launchRequest.fps}
                        />
                    </Col>

                    <Col xs={12} sm={2}>
                        <SelectInput
                            label="Screen Mode:"
                            name="fullscreenMode"
                            onChange={handleChange}
                            options={[
                                { label: 'Windowed', value: 0 },
                                { label: 'Maximized', value: 1 },
                                { label: 'Fullscreen', value: 2 },
                            ]}
                            value={launchRequest.fullscreenMode}
                        />
                    </Col>
                </Row>
            </CardBody>
        </Card>

        <Card className="mt-2">
            <CardBody>
                <Row>
                    <Col xs={12} sm={2}>
                        <SelectInput
                            label="FFMPG Support:"
                            name="ffmpgSupport"
                            onChange={handleChange}
                            options={[
                                { label: 'Off', value: 0 },
                                { label: 'x264', value: 1 },
                                { label: 'x265', value: 2 }
                            ]}
                            value={launchRequest.ffmpgSupport}
                        />
                    </Col>

                    <Col xs={12} sm={4}>
                        <FolderSelectInput
                            label="FFMPG Path:"
                            name="ffmpgPath"
                            onChange={handleChange}
                            value={launchRequest.ffmpgPath}
                        />
                    </Col>

                    <Col xs={12} sm={4}>
                        <NumericInput
                            label="FFMPG Crf:"
                            name="ffmpgCrf"
                            onChange={handleChange}
                            value={launchRequest.ffmpgCrf}
                        />
                    </Col>
                </Row>
            </CardBody>
        </Card>

        <Card className="mt-2">
            <CardBody>
                <Row>
                    <Col xs={12}>
                        <TextInput
                            label="Debug String:"
                            name="outputDebugStrings"
                            onChange={handleChange}
                            value={launchRequest.outputDebugStrings}
                        />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </>;
};

export default LaunchOutputOptions;
