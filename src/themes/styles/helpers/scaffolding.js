import {
  injectGlobal
} from 'styled-components'
// import {
//   default as VARIABLES
// } from './variables' // Use relative path for React Styleguidist

// //////////////////////////////////////////////////////////////////////////////////////////////////
// ==================================================================================================
//
// Scaffolding
// Ref: https://github.com/twbs/bootstrap-sass/blob/master/assets/stylesheets/bootstrap/_scaffolding.scss
//
// ==================================================================================================
// //////////////////////////////////////////////////////////////////////////////////////////////////

injectGlobal`
  html {
    touch-action: manipulation; /* remove the 300-350ms tap delay */
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    overflow-y: auto;
    text-rendering: optimizeLegibility;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal; /* Reset for Embed font */
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }

    &:focus {}

    &:active {}

    &:visited {}
  }

  label {
    margin-bottom: 0;
  }

  address {
    font-style: normal;
  }

  button {
    &:focus {
      outline: none;
    }
  }

  fieldset {
    border: none;
  }

  legend {
    width: 100%;
  }

  input,
  button,
  select,
  textarea {
    /* Reset fonts for relevant elements */
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;

    &:focus {
      outline: none;
    }
  }

  input {
    outline: none;
  }

  picture {
    display: inline-block;
  }

  picture,
  img {
    vertical-align: middle;
  }

  hr {
    margin-top: 0;
    margin-bottom: 0;
    border: 0;
    border-top: 1px solid;
  }

  /*
  // iOS "clickable elements" fix for role="button"
  // --
  // Fixes "clickability" issue (and more generally, the firing of events such as focus as well)
  // for traditionally non-focusable elements with role="button"
  // see https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile
  */
  [role='button'] {
    cursor: pointer;
  }

  /*
  // Only display content to screen readers
  // --
  // See: http://a11yproject.com/posts/how-to-hide-content/
  */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  /*
  // Use in conjunction with .sr-only to only display content when it's focused.
  // Useful for "Skip to main content" links see http://www.w3.org/TR/2013/NOTE-WCAG20-TECHS-20130905/G1
  // Credit: HTML5 Boilerplate
  */
  .sr-only-focusable {
    &:active,
    &:focus {
      position: static;
      width: auto;
      height: auto;
      margin: 0;
      overflow: visible;
      clip: auto;
    }
  }
`;
