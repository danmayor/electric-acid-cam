import * as React from 'react';
import { MdOutlineSettingsApplications } from 'react-icons/md';
import { Card, CardBody, CardFooter, CardHeader, Col, Input, Row } from 'reactstrap';
import FolderSelectInput from './common/FolderSelectInput';
import PageHeader from './common/PageHeader';
import TextInput from './common/TextInput';

const SettingsPage: React.FC = () => {
    return <>
        <PageHeader
            icon={<MdOutlineSettingsApplications />}
            title='App settings'
            crumbs={[
                { active: true, url: '/settings', label: 'Settings' }
            ]}
        />

        <form>
            <Card>
                <CardHeader>
                    <h2>Application Settings</h2>
                </CardHeader>

                <CardBody>
                    <Row>
                        <Col xs={12} sm={6}>
                            <FolderSelectInput className="mb-2" label="AcidCam path:" />
                        </Col>

                        <Col xs={12} sm={6}>
                            <FolderSelectInput className="mb-2" label="Capture path:" />
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
