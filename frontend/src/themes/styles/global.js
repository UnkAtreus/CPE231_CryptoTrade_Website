import {
  injectGlobal
} from 'styled-components'

import {
  default as VARIABLES
} from '../../themes/styles/variables'

injectGlobal`

  * {
    box-sizing: border-box;
    font-family: 'Prompt', sans-serif;
    color: #ffffff;
    font-size: 12px;
  }

  body {
    background-color: #33334B;
    overflow-x: hidden !important;
    width: 100vw;
    overflow-y: auto;
  }

.scrollBar:hover::-webkit-scrollbar, ::-webkit-scrollbar {
    width: 5px;
    height: 6px;
  }

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgb(94, 102, 115);
  border-radius: 3px;
  height: 90px;
}

  .content-row {
    display: flex;
  }

  .content-column {
    display: block;
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

  .space-between {
    justify-content: space-between;
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
  
  .text-9 {
    font-size: 9px;
    font-weight: 500;
    line-height: 13px;
    color: ${VARIABLES.COLORS.GRAY};
  }

  .label {
    font-size: ${VARIABLES.TYPOGRAPHYS.FONT_THEME.LABEL};
    font-weight: 500;
    line-height: 18px;
    color: ${VARIABLES.COLORS.WHITE};
  }

  .paragraph {
    font-size: ${VARIABLES.TYPOGRAPHYS.FONT_THEME.PARAGRAPH};
    font-weight: 500;
    line-height: 24px;
    color: ${VARIABLES.COLORS.WHITE};
  }

  .title {
    font-size: ${VARIABLES.TYPOGRAPHYS.FONT_THEME.TITLE};
    font-weight: 500;
    line-height: 27px;
    color: ${VARIABLES.COLORS.WHITE};
  }

  .feature-card-title {
    font-size: ${VARIABLES.TYPOGRAPHYS.FONT_THEME.FEATURE_CARD_TITLE};
    font-weight: 500;
    line-height: 36px;
    color: ${VARIABLES.COLORS.WHITE};
  }

  .section-headline {
    font-size: ${VARIABLES.TYPOGRAPHYS.FONT_THEME.SECTION_HEADLINE};
    font-weight: 700;
    line-height: 54px;
    color: ${VARIABLES.COLORS.WHITE};
  }

  .headline {
    font-size: ${VARIABLES.TYPOGRAPHYS.FONT_THEME.HEADLINE};
    font-weight: 700;
    line-height: 72px;
    color: ${VARIABLES.COLORS.WHITE};
  }

  .white {
    color: ${VARIABLES.COLORS.WHITE};
  }

  .red {
    color: ${VARIABLES.COLORS.RED};
  }

  .green {
    color: ${VARIABLES.COLORS.GREEN};
  }
  
  .gray {
    color: ${VARIABLES.COLORS.GRAY};
  }

  .purple {
    color: ${VARIABLES.COLORS.PURPLE};
  }

  .bg-white {
    background-color: ${VARIABLES.COLORS.WHITE};
  }

  .bg-red {
    background-color: ${VARIABLES.COLORS.RED};
  }

  .bg-green {
    background-color: ${VARIABLES.COLORS.GREEN};
  }
  
  .bg-gray {
    background-color: ${VARIABLES.COLORS.GRAY};
  }

  .bg-purple {
    background-color: ${VARIABLES.COLORS.PURPLE};
  }

  .mgb-2 {
    margin-bottom: 2px;
  }

  .mgb-8 {
    margin-bottom: 8px;
  }

  .mgb-16 {
    margin-bottom: 16px;
  }

  .mgb-24 {
    margin-bottom: 24px;
  }
  
  .mgr-4 {
    margin-right: 4px;
  }

  .mgr-8 {
    margin-right: 8px;
  }

  .mgr-16 {
    margin-right: 16px;
  }

  .mgr-32 {
    margin-right: 32px;
  }

  .mgl-8 {
    margin-left: 8px;
  }

  .mgl-16 {
    margin-left: 16px;
  }

  .logo-symbol {
    width: 24px;
    height: 24px;
    background-color: #ffffff;
    border-radius: ${VARIABLES.BORDER_RADIUSES.ROUNDED};
  }

  .pointer {
    cursor: pointer;
  }
`;
