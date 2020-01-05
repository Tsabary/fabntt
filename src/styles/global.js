import {createGlobalStyle} from 'styled-components'

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto;

  }
  html {
      font-size : 62.5%
      @media only screen and (max-width: 1100px) {
        font-size : 50%
      }
  }
`;

export default Global;