import React, {Component} from 'react';
import { NavItem, Nav } from 'react-bootstrap';


class HeaderLinks extends Component{
    render(){
        return (
            <div>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">Account</NavItem>
                    <NavItem eventKey={2} href="#">Log out</NavItem>
                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;
