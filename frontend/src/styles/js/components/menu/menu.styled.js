import styled from 'styled-components';

//custom css applied to devices with smaller screens of 576px
//expose styling for menu component
export const StyledMenu = styled.nav`
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.grey};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  overflow: hidden;
  
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  .text-styles {
    font-size: 2.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.dark};
    text-decoration: none;
    transition: color 0.3s linear;
    
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.hover};
      text-decoration: underline;
    }
  }
`;