import React from 'react'
import { Nav, NavLink, Navbar, NavbarBrand, NavItem} from 'reactstrap'
import Notifications from './notifications'

const Navigation = (props) => {
      
    return (
      <div>
        <Navbar color="light" light expand="md" style={{ margin: '0 -15px' }}>
          <NavbarBrand >Menü</NavbarBrand>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink onClick={() => props.changeSite(0)} className='pointer' >Fallverwaltung</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={() => props.changeSite(1)} className='pointer' >Modulverwaltung</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={() => props.changeSite(2)} className='pointer' >Stammdaten</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={() => props.changeSite(3)} className='pointer' >Hochschulen</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={() => props.changeSite(4)} className='pointer' >Archiv</NavLink>
                </NavItem>
            </Nav>
            <Notifications setDetail={props.setDetail} />
          
        </Navbar>

      </div>
    );
  }
  
  export default Navigation;

