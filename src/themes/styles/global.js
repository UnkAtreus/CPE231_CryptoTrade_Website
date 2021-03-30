import {
  injectGlobal
} from 'styled-components'

injectGlobal`
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
