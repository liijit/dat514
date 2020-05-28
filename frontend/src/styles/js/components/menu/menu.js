import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './menu.styled';
import { Link } from 'react-router-dom';


const Menu = ( {open, setOpen} ) => {
  return (
	  //when clicking on one of the links, close the nav bar
    <StyledMenu open={open}>
      <Link to="/login" className="text-styles" onClick={() => setOpen(!open)}>Login</Link>
      <Link to="/register" className="text-styles" onClick={() => setOpen(!open)}>Register</Link>
      <Link to="/dashboard" className="text-styles" onClick={() => setOpen(!open)}>Dashboard</Link>
    </StyledMenu>
  )
}

Menu.propTypes = {
	open: bool.isRequired,
}
export default Menu;