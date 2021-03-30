import {
  injectGlobal
} from 'styled-components'

injectGlobal`

  * {
    box-sizing: border-box;
    font-family: 'Prompt', sans-serif;
    color: #ffffff;
    font-size: 12px;
    background-color: #33334B;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }

  .justify-content-center {
    justify-content: center;
  }

  .justify-content-end {
    justify-content: flex-end;
  }

  .justify-content-start {
    justify-content: flex-start;
  }

  .align-items-center {
    align-items: center;
  }

  .align-items-end {
    align-items: flex-end
  }

  .align-items-start {
    align-items: flex-start
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }
`;
