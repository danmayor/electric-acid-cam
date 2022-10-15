import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Col, Container, Row } from 'reactstrap';

import AppNav from './components/AppNav';
import LeftNav from './components/LeftNav';

const App: React.FC = () => {
    return <div className="h-100 bg-dark">
        <AppNav />
        <Container fluid={true} className="px-0">
            <Row className="gx-0">
                <Col xs={2}>
                    <div className="ps-3">
                        <LeftNav />
                    </div>
                </Col>

                <Col xs={10}>
                    <div className="bg-light me-3 content-container p-3">
                        Options / Buttons and stuff here
                    </div>
                </Col>
            </Row>
        </Container>
    </div>;
}

ReactDOM.render(<App />, document.getElementById('appContainer'));
