import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Container } from 'reactstrap';

import AppNav from './components/layout/AppNav';
import DashboardPage from './components/DashboardPage';
import HelpPage from './components/HelpPage';
import LaunchPage from './components/LaunchPage';
import LeftNav from './components/layout/LeftNav';
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
    return <HashRouter>
        <AppNav />

        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <LeftNav />
            </div>

            <div id="layoutSidenav_content">
                <main>
                    <Container fluid={true} className="px-4">
                        <Routes>
                            <Route path="help" element={<HelpPage />} />
                            <Route path="launcher" element={<LaunchPage />} />
                            <Route path="settings" element={<SettingsPage />} />
                            <Route path="" element={<DashboardPage />} />
                        </Routes>
                    </Container>
                </main>
            </div>
        </div>
    </HashRouter>;
};

createRoot(document.getElementById('appContainer'))
    .render(<App />);
