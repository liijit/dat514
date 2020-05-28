import { createGlobalStyle } from 'styled-components';

//create global css properties
export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0 !important;
    padding: 0 !important;
  }
  .root{
    width:100vw;
    height: 100vh;
    z-index:-100;
}

  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    height: 100vh;
    align-items: center;
    color: #EFFFFA;
    font-family: Arial, "Segoe UI", Helvetica, sans-serif;
    justify-content: center;
    text-rendering: optimizeLegibility;
  }
  
  form, label, blockquote, dd, dt, dl, figure, form, ol, p, pre, table, ul, li {
    margin: 0;
    padding: 0;
  }

  button{
    margin-bottom: 0;
  }

  .labelcont {
    display: flex;
    padding-top: 20px;
    justify-content: space-between;
    padding: 0;
}

.label {
    width: auto;
    padding: 6.5px;
}

.labelres {
    width: auto;
    text-align: right;
    font-size: 14px;

}

.labelres p {
    border: 2px solid red;
    border-radius: 4px;
    padding: 2.5px;
    padding-color:red;
    background: red;
    color: white;
}

.label p {
    color: grey;
    font-size: 1.5rem;
}

.menucontainer {
    display: flex;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
}

.container {
    height: inherit;
    width: inherit;
}

.nopad {
    padding: 0;
}

.flexy {
    justify-content: center;
    align-items: center;
    display: flex;
    width: inherit;
    height: inherit;
}

.flexy2 {
    justify-content: space-between;
    align-items: center;
    display: flex;
    /*width: inherit;*/
    height: inherit;
}

.flexy3 {
    justify-content: center;
    align-items: center;
    display: flex;
    height: inherit;
}


.menu {
    padding: 50px 50px;
    width: 400px;
    min-width: 350px;
    border-color: black;
    border-radius: 20px;
    border-width: 0.4rem;
    border-style: solid;
}

.grid p {
    color: black;
    font-style: bold;
    font-size: 2.5rem;
}

.logo-c {
    display: flex;
    height: 100px;
    justify-content: center;
    align-items: center;
}

.logo {
    height: 90%;
    display: flex;
}

.buttonW {
    width: 100%;
    background-color: #9b4dca;
    border: 0.1rem solid #9b4dca;
    border-radius: .4rem;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 1.1rem;
    font-weight: 700;
    height: 3.8rem;
    letter-spacing: .1rem;
    line-height: 3.8rem;
    padding: 0 3.0rem;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;
}

.buttonW:hover {
    background-color: grey;
    color: #fff;
}

.b1 {}

.b2 {
    margin-top: 40px;
}

@media (max-width: ${({ theme }) => theme.mobile}) { 
    .menu {
    padding: 50px 50px;
    width: 400px;
    min-width: 350px;
    border-color: black;
    border-radius: unset;
    border-width: unset;
    border-style: unset;
}
}
  `