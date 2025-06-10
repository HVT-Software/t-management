import { css, CssVarsTheme, ListItemButton, styled } from '@mui/material';

import { ARROW_CLASS, NAME_CLASS, SIDEBAR_COLLAPSED } from '../navigation.constants';

const NAV_ITEM_MIN_HEIGHT = 44;
const NAV_ITEM_COLLAPSED_HEIGHT = 56;

const activeStyles = ({ theme }: { theme?: CssVarsTheme }) => css`
  color: ${theme?.vars.palette.primary.main};
  font-weight: 600;
  background-color: ${theme?.palette.primary.main}08;
  &:hover {
    background-color: ${theme?.palette.primary.main}16;
  }
`;

export const NavItem = styled(ListItemButton)`
  padding: ${({ theme }) => theme.spacing(0.5, 1, 0.5, 1.5)};
  min-height: ${NAV_ITEM_MIN_HEIGHT}px;
  border-radius: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.vars.palette.text.secondary};
  text-transform: capitalize;
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  & .${NAME_CLASS} {
    flex: 1 1 auto;
  }

  .${SIDEBAR_COLLAPSED} & {
    flex-direction: column;
    font-size: 10px;
    justify-content: center;
    align-items: center;
    min-height: ${NAV_ITEM_COLLAPSED_HEIGHT}px;
    padding: ${({ theme }) => theme.spacing(0.5)};
    position: relative;
    .${ARROW_CLASS} {
      position: absolute;
      top: 6px;
      right: 6px;
    }
    & .${NAME_CLASS} {
      flex: 0;
    }
  }

  ${({ selected }) => selected && activeStyles}
`;
