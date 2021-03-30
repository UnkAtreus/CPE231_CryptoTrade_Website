import {
  COLORS
} from '../../themes'

export const MIXINS = {
  // Placeholder
  // ==================================================================================================
  PLACEHOLDER: ({
    color = COLORS.GRAY_1
  }) => {
    return `
      &::-moz-placeholder {
        color: ${color};
        opacity: 1;
      }

      &:-ms-input-placeholder {
        color: ${color};
      }

      &::-webkit-input-placeholder {
        color: ${color};
      }
    `
  },

  // Ellipsis
  // ==================================================================================================
  ELLIPSIS: ({
    display = 'inline-block',
    maxWidth = '100%'
  }) => {
    return `
      display: ${display};
      max-width: ${maxWidth};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
    `
  }
}
