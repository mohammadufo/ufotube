// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { css } from 'styled-components'

// MEDIA QUERY MANAGER
/*
0 - 600px:      Phone
600 - 900px:    Tablet portrait
900 - 1200px:   Tablet landscape
[1200 - 1800] is where our normal styles apply
1800px + :      Big desktop
$breakpoint arguement choices:
- phone
- tab-port
- tab-land
- big-desktop
1em = 16px
*/

export const phone = (props) => {
  return css`
    @media only screen and (max-width: 37.5em) {
      ${props}
    }
  `
}

export const tabletPort = (props) => {
  return css`
    @media only screen and (max-width: 56.25em) and (min-width: 37.5em) {
      ${props}
    }
  `
}

export const tabletLand = (props) => {
  return css`
    @media only screen and (max-width: 75em) and (min-width: 56.25em) {
      ${props}
    }
  `
}

export const laptop = (props) => {
  return css`
    @media only screen and (min-width: 75em) and (max-width: 87.5em) {
      ${props}
    }
  `
}

export const bigDesktop = (props) => {
  return css`
    @media only screen and (min-width: 112.5em) {
      ${props}
    }
  `
}
