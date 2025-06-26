import { ListItemButton, styled } from '@mui/material';

export const DotIcon = styled('span')`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  margin-right: ${({ theme }) => theme.spacing(2)};
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  &::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.vars.palette.grey[500]};
    transition: transform 0.2s ${({ theme }) => theme.transitions.easing.sharp} 0s;
  }

  .active > &::before {
    transform: scale(2);
    background-color: ${({ theme }) => theme.vars.palette.primary.main};
  }
`;

const SUB_NAV_ITEM_HEIGHT = 36;

export const StyledListItemButton = styled(ListItemButton)`
  margin: ${({ theme }) => theme.spacing(0, 0, 0.5)};
  padding: ${({ theme }) => theme.spacing(0.5, 1, 0.5, 1.5)};
  background-color: transparent;
  color: ${({ theme }) => theme.vars.palette.text.secondary};
  min-height: ${SUB_NAV_ITEM_HEIGHT}px;
  border-radius: ${({ theme }) => theme.spacing(1)};

  &.active {
    font-weight: 700;
    transition: background-color 0.15s ${({ theme }) => theme.transitions.easing.easeInOut} 0s;
    color: ${({ theme }) => theme.vars.palette.primary.dark};
  }
`;
