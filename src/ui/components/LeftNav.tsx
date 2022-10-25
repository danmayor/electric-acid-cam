import * as React from 'react';
import { MdDashboard, MdHelp, MdOutlineSettingsApplications, MdVideoSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';

const LeftNav: React.FC = () => {
    return <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
            <div className="nav">
                <Link className="nav-link" to="/">
                    <div className="sb-nav-link-icon">
                        <MdDashboard />
                    </div>
                    Dashboard
                </Link>

                <Link className="nav-link" to="/settings">
                    <div className="sb-nav-link-icon">
                        <MdOutlineSettingsApplications />
                    </div>
                    Settings
                </Link>

                <Link className="nav-link" to="/launcher">
                    <div className="sb-nav-link-icon">
                        <MdVideoSettings />
                    </div>
                    Acid Cam
                </Link>

                <Link className="nav-link" to="/help">
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
