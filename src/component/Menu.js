import React from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import greenUniversity from '../image/Logo.png';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="customNavbar" style={{ margin: 0, padding: 0 }}>
           <Navbar className="customNavbar" light expand="md" fixed={`top`}>
          <NavbarBrand href="/" style={{ color: 'red' }} >
            <img  src={greenUniversity} responsive alt="University logo" style={{ height: 70, width: 200 }} />

          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

            <NavItem>
                <NavLink  tag={Link} to="/" style={{ color: 'black', fontWeight: 'bold' }}>Home</NavLink>
              </NavItem>
            <NavItem>

                <NavLink  tag={Link} to="/tentative-courses" style={{ color: 'black', fontWeight: 'bold' }}>Tentative Courses</NavLink>
              </NavItem>

              <NavItem>
                <NavLink  tag={Link}  to="/taken-courses" style={{ color: 'black', fontWeight: 'bold' }}>Taken Courses</NavLink>
              </NavItem>

               {/* <NavItem>
                <NavLink  tag={Link}  to="/taken-coursesDemo" style={{ color: 'black', fontWeight: 'bold' }}>Taken Courses Demo</NavLink>
              </NavItem> */}

               <NavItem>
                <NavLink  tag={Link}  to="/all-CoursesUpload" style={{ color: 'black', fontWeight: 'bold' }}>All Courses Upload</NavLink>
              </NavItem>

               <NavItem>
                <NavLink  tag={Link}  to="/all-TakenCoursesUpload" style={{ color: 'black', fontWeight: 'bold' }}>All Taken Courses Upload</NavLink>
              </NavItem>

              
              <NavItem>
                <NavLink  tag={Link}  to="/taken-CoursesFinal" style={{ color: 'black', fontWeight: 'bold' }}>Taken Courses Final</NavLink>
              </NavItem>

            </Nav>

            
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default Menu
