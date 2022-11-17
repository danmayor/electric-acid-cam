import * as React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import LaunchRequest from '../../../common/LaunchRequest';
import FileSelectInput from '../common/FileSelectInput';
import FolderSelectInput from '../common/FolderSelectInput';
import NumericInput from '../common/NumericInput';

interface LaunchVideoOptionsProps {
    launchRequest: LaunchRequest;
    setLaunchRequest: (launchRequest: LaunchRequest) => void;
}

const LaunchVideoOptions: React.FC<LaunchVideoOptionsProps> = (props: LaunchVideoOptionsProps) => {
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
                    <Col xs={12} sm={3}>
                        <FolderSelectInput
                            label="Shader Path:"
                            name="shaderPath"
                            onChange={handleChange}
                            value={launchRequest.shaderPath}
                        />
                    </Col>

                    <Col xs={12} sm={3}>
                        <NumericInput
                            label="Shader Start Index:"
                            name="shaderStartIndex"
                            onChange={handleChange}
                            value={launchRequest.shaderStartIndex}
                        />
                    </Col>

                    <Col xs={12} sm={3}>
                        <FolderSelectInput
                            label="Custom Filter Path:"
                            name="customFilterPath"
                            onChange={handleChange}
                            value={launchRequest.customFilterPath}
                        />
                    </Col>

                    <Col xs={12} sm={3}>
                        <NumericInput
                            label="Filter Start Index:"
                            name="filterStartIndex"
                            onChange={handleChange}
                            value={launchRequest.filterStartIndex}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} sm={3}>
                        <FileSelectInput
                            label="Material Texture:"
                            name="materialTexture"
                            onChange={handleChange}
                            value={launchRequest.materialTexture}
                        />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </>;
};

export default LaunchVideoOptions;
