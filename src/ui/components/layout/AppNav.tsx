import * as React from 'react';
import { FaRegWindowMaximize } from 'react-icons/fa';
import { MdClose, MdMinimize } from 'react-icons/md';
import { Link } from 'react-router-dom';
import {
    Button,
    Nav, Navbar, NavbarBrand, NavItem
} from 'reactstrap';

/**
 * Our top application navbar component
 * 
 * @returns JSX to construct the component on screen
 */
const AppNav: React.FC = () => {
    /**
     * Closes the current BrowserWindow rendering this UI, Program
     * will quit, or idle on MAC automatically.
     */
    const onClose = React.useCallback(() => window.close(), []);

    /**
     * Toggles maximized mode
     */
    const onMaximize = React.useCallback(() => window.app.maximize(), []);

    /**
     * Minimizes the window
     */
    const onMinimize = React.useCallback(() => window.app.minimize(), []);

    return <Navbar className="sb-topnav navbar-dark bg-dark" id="AppNav">
        <Link className="navbar-brand" to="/">Electric Acid Cam</Link>

        <Nav>
            <NavItem>
                <a className="text-white nav-link" onClick={onMinimize} href="#">
                    <MdMinimize />
                </a>
            </NavItem>

            <NavItem>
                <a className="text-white nav-link" onClick={onMaximize} href="#">
                    <FaRegWindowMaximize />
                </a>
            </NavItem>

            <NavItem>
                <a className="text-white nav-link" onClick={onClose} href="#">
                    <MdClose />
                </a>
            </NavItem>
        </Nav>
    </Navbar>;
}

export default AppNav;
