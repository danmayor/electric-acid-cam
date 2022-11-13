import * as React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import LaunchRequest from '../../../common/LaunchRequest';
import FolderSelectInput from '../common/FolderSelectInput';
import NumericInput from '../common/NumericInput';
import SelectInput from '../common/SelectInput';
import SwitchInput from '../common/SwitchInput';
import TextInput from '../common/TextInput';

export interface LaunchInputOptionsProps {
    launchRequest: LaunchRequest;
    setFolderPicker: (fieldName: string) => void;
    setLaunchRequest: (launchRequest: LaunchRequest) => void;
}

const LaunchInputOptions: React.FC<LaunchInputOptionsProps> = (props: LaunchInputOptionsProps) => {
    const { launchRequest, setFolderPicker, setLaunchRequest } = props;

    /**
     * Internal handler that will call our props.setLaunchRequest
     */
    const handleChange = React.useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        setLaunchRequest({
            ...launchRequest,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }, [launchRequest, setLaunchRequest]);

    return <>
        <Card>
            <CardBody>
                <Row>
                    <Col xs={12} sm={4}>
                        <SelectInput
                            label="Capture Mode:"
                            name="captureMode"
                            onChange={handleChange}
                            options={[
                                { label: 'Device', value: 'device' },
                                { label: 'Video File', value: 'file' }
                            ]}
                            value={launchRequest.captureMode}
                        />
                    </Col>

                    {launchRequest.captureMode === 'device' && <>
                        <Col xs={12} sm={4}>
                            <SelectInput
                                label="Capture Device:"
                                name="captureDevice"
                                onChange={handleChange}
                                options={[
                                    { label: '0', value: 0 },
                                    { label: '1', value: 1 }
                                ]}
                                value={launchRequest.captureDevice}
                            />
                        </Col>

                        <Col xs={12} sm={4}>
                            <SelectInput
                                label="Device Resolution:"
                                name="cameraResolution"
                                onChange={handleChange}
                                options={[
                                    { label: '600x400', value: '600x400' },
                                    { label: '800x600', value: '800x600' },
                                    { label: '1024x768', value: '1024x768' },
                                    { label: '1280x720', value: '1280x720' }
                                ]}
                                value={launchRequest.cameraResolution}
                            />
                        </Col>
                    </>}

                    {launchRequest.captureMode === 'file' && <>
                        <Col xs={12} sm={4}>
                            <FolderSelectInput
                                label="Vide Filename:"
                                onClick={() => setFolderPicker('inputVideoFilename')}
                                value={launchRequest.inputVideoFilename}
                            />
                        </Col>

                        <Col xs={6} sm={2}>
                            <SwitchInput
                                label="Loop Video:"
                                name="inputVideoLoop"
                                onChange={handleChange}
                                value={launchRequest.inputVideoLoop}
                            />
                        </Col>

                        <Col xs={6} sm={2}>
                            <NumericInput
                                label="Start At (seconds):"
                                name="inputVideoStartAt"
                                onChange={handleChange}
                                value={launchRequest.inputVideoStartAt}
                            />
                        </Col>
                    </>}
                </Row>
            </CardBody>
        </Card>
    </>;
};

export default LaunchInputOptions;
