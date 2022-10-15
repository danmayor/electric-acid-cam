import * as React from 'react';
import {
    Button,
    Nav, Navbar, NavbarBrand, NavItem
} from 'reactstrap';

const AppNav: React.FC = () => {
    const onClose = React.useCallback(() => {
        window.close();
    }, []);

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
