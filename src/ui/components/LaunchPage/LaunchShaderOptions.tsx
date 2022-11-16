import * as React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import LaunchRequest from '../../../common/LaunchRequest';
import FolderSelectInput from '../common/FolderSelectInput';

interface LaunchShaderOptionsProps {
    launchRequest: LaunchRequest;
    setLaunchRequest: (launchRequest: LaunchRequest) => void;
}

const LaunchShaderOptions: React.FC<LaunchShaderOptionsProps> = (props: LaunchShaderOptionsProps) => {
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
                        <FolderSelectInput
                            label="Shader Path:"
                            name="shaderPath"
                            onChange={handleChange}
                            value={launchRequest.shaderPath}
                        />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </>;
};

export default LaunchShaderOptions;
