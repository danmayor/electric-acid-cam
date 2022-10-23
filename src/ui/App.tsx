import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, Col, Container, Row } from 'reactstrap';

import AppNav from './components/AppNav';
import LeftNav from './components/LeftNav';

/**
 * Our primary application component
 * 
 * @returns App component
 */
const App: React.FC = () => {
    /**
     * Example for now, showing how to call our program API methods
     * (The stuff defined in AppApi.ts / preloader.ts)
     */
    const onLaunchClick = React.useCallback(() => {
        const command = {
            path: 'path',
            props: ['a', 'b', 'c']
        };

        window.app.launchAcidCam(command);
    }, []);

    /**
     * Returns our primary application component
     */
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
                        Options / Buttons and stuff here<br /><br />
                        <Button className="btn-success" onClick={onLaunchClick}>Launch AcidCam!</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>;
}

ReactDOM.render(<App />, document.getElementById('appContainer'));
