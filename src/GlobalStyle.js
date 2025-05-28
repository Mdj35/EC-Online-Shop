// src/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    background-color: white;
  }
`;

export default GlobalStyle;
