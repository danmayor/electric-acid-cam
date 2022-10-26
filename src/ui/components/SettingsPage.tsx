import * as React from 'react';
import { MdOutlineSettingsApplications } from 'react-icons/md';
import { Card, CardBody, CardHeader, Col, Input, Row } from 'reactstrap';
import PageHeader from './common/PageHeader';

const SettingsPage: React.FC = () => {
    return <>
        <PageHeader
            icon={<MdOutlineSettingsApplications />}
            title='App settings'
            crumbs={[
                { active: true, url: '/settings', label: 'Settings' }
            ]}
        />

        <Card>
            <CardHeader>Application Settings</CardHeader>
            <CardBody>
                <Row>
                    <Col xs={12} sm={6}>Acid Cam Path</Col>
                    <Col xs={12} sm={6}><Input type="text" /></Col>
                </Row>

                <Row>
                    <Col xs={12} sm={6}>Capture Path</Col>
                    <Col xs={12} sm={6}><Input type="text" /></Col>
                </Row>
            </CardBody>
        </Card>
    </>;
};

export default SettingsPage;
