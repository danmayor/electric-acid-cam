import * as React from 'react';
import { MdHelp, MdOutlineSettingsApplications, MdVideoSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Col, Row } from 'reactstrap';

const LeftNav: React.FC = () => {
    return <div className="bg-dark text-light">
        <Link to="/">
            <Row>
                <Col xs={2}><MdOutlineSettingsApplications /></Col>
                <Col xs={10}>Settings</Col>
            </Row>
        </Link>

        <Link to="/launcher">
            <Row>
                <Col xs={2}><MdVideoSettings /></Col>
                <Col xs={10}>Launch</Col>
            </Row>
        </Link>

        <Link to="/help">
            <Row>
                <Col xs={2}><MdHelp /></Col>
                <Col xs={10}>Help</Col>
            </Row>
        </Link>
    </div>
};

export default LeftNav;
