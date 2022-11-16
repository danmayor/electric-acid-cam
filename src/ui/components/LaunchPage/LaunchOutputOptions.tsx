import * as React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import LaunchRequest from '../../../common/LaunchRequest';
import SelectInput from '../common/SelectInput';
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
            </CardBody>
        </Card>
    </>;
};

export default LaunchOutputOptions;
