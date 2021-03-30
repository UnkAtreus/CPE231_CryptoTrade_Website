import {
  css
} from 'styled-components'
import {
  COLORS,
  FONTS,
  MIXINS
} from '../variables'

// Text default style
// ============================================================
const DEFAULT_PROPS = css`
  font-weight: normal;
  vertical-align: middle;
  text-transform: none;
`

export const TYPOGRAPHYS = {
  FRIST_1: css`
    ${DEFAULT_PROPS}
  `,
}

console.log('test' + COLORS.BLACK)
