import styled from 'styled-components';

//expose styling for burger component
//custom css applied to devices with smaller screens of 576px
export const StyledBurger = styled.button`
  z-index: 100;
  position: absolute;
  top: 5%;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  
  &:focus {
    outline: none;
  }
  
  span {
    width: 2rem;
    height: 0.4rem;
    background: ${({ theme }) => theme.black};
    border-radius: 5px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
      top: 5%;
      width: 4rem;
      left: unset;
      right: 2rem;
      height: 3rem;

    span {
      width: 3rem;
      height: 0.75rem;
      transform-origin: 40px;
    }
  }
`;