import * as React from 'react';
import { MdDashboard, MdHelp, MdOutlineSettingsApplications, MdVideoSettings } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

const LeftNav: React.FC = () => {
    const location = useLocation();
    const currentSection = location.pathname.slice(1);

    return <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
            <div className="nav">
                <Link
                    className={`nav-link ${currentSection === '' || currentSection === 'dashboard' ? 'active' : ''}`}
                    to="/"
                >
                    <div className="sb-nav-link-icon">
                        <MdDashboard />
                    </div>
                    Dashboard
                </Link>

                <Link
                    className={`nav-link ${currentSection === 'settings' ? 'active' : ''}`}
                    to="/settings"
                >
                    <div className="sb-nav-link-icon">
                        <MdOutlineSettingsApplications />
                    </div>
                    Settings
                </Link>

                <Link
                    className={`nav-link ${currentSection === 'launcher' ? 'active' : ''}`}
                    to="/launcher"
                >
                    <div className="sb-nav-link-icon">
                        <MdVideoSettings />
                    </div>
                    Acid Cam
                </Link>

                <Link
                    className={`nav-link ${currentSection === 'help' ? 'active' : ''}`}
                    to="/help"
                >
                    <div className="sb-nav-link-icon">
                        <MdHelp />
                    </div>
                    Help
                </Link>
            </div>
        </div>

        <div className="sb-sidenav-footer">
            <div className="small">Version:</div>
            0.1.0
        </div>
    </nav>;
};

export default LeftNav;
