import * as React from 'react';
import { FaGreaterThan } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { Col, Row } from 'reactstrap';

const DashboardPage: React.FC = () => {
    return <>
        <h1 className="mt-4"><MdDashboard />&nbsp;Acid Dash</h1>
        <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Acid Dash</li>
        </ol>

        <Row>
            <Col>
                <div className="card bg-primary text-white">
                    <div className="card-body">
                        <h2>AcidCam News</h2>
                        At least 1 thing coming soon!
                    </div>

                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" href="#">View Details</a>
                        <div className="small text-white">
                            <FaGreaterThan />
                        </div>
                    </div>
                </div>
            </Col>

            <Col>
                <div className="card bg-success text-white">
                    <div className="card-body">
                        <h2>Up to date!</h2>
                        You on the most recent version!
                    </div>

                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" href="#">View Site</a>
                        <div className="small text-white">
                            <FaGreaterThan />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>

        <h2 className="my-4">Recent Captures:</h2>
        Coming soon...
    </>;
};

export default DashboardPage;
