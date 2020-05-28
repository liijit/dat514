import styled from 'styled-components';

//expose styling for burger component
//custom css applied to devices with smaller screens of 576px
export const StyledDelete = styled.button`

:hover {
  opacity: 1;
}
:before, :after {
  position: absolute;
  content: ' ';
  width: 5px;
  background-color: #333;
  height: 20px;
}
:before {
  transform: rotate(45deg);
}
:after {
  transform: rotate(-45deg);
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