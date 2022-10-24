import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import AppNav from './components/AppNav';
import HelpPage from './components/HelpPage';
import LaunchPage from './components/LaunchPage';
import LeftNav from './components/LeftNav';
import SettingsPage from './components/SettingsPage';

/**
 * Our primary application component
 * 
 * @returns App component
 */
const App: React.FC = () => {
    /**
     * Returns our primary application component
     */
    return <div className="h-100 bg-dark">
        <HashRouter>
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
                            <Routes>
                                <Route path="help" element={<HelpPage />} />
                                <Route path="launcher" element={<LaunchPage />} />
                                <Route path="" element={<SettingsPage />} />
                            </Routes>
                        </div>
                    </Col>
                </Row>
            </Container>
        </HashRouter>
    </div>;
}

createRoot(document.getElementById('appContainer'))
    .render(<App />);
