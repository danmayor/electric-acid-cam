import * as React from 'react';
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
    const onClose = React.useCallback(() => {
        window.close();
    }, []);

    /**
     * Returns our top application navbar component
     */
    return <Navbar color="dark" dark className="border-bottom-gray mb-2" id="AppNav">
        <NavbarBrand href="/">Electric Acid Cam</NavbarBrand>

        <Nav className="ms-auto" navbar>
            <NavItem>
                <Button color="danger" onClick={onClose}>X</Button>
            </NavItem>
        </Nav>
    </Navbar>;
}

export default AppNav;
