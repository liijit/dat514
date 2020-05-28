import React from 'react';
import { bool, func } from 'prop-types';
import { StyledDelete } from './delete.styled';

//parse state into function
const Delete = () => {
  return (
  	// on 'open' state, when pressed return 'open' as 'false'
    // <StyledBurger open={open} onClick={() => setOpen(!open)}>
    <StyledDelete/>
  )
}

//show warning message if the following isn't the type it's specified as
Delete.propTypes = {

};

export default Delete;