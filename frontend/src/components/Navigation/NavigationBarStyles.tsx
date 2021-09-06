import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';

export const useStyles = makeStyles(() => ({
  icons: {
    height: '40px',
    width: '40px',
    color: 'white',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  avatars: {
    height: '50px',
    width: '50px',
  },
}));

export const NavigationBarContainer = styled.div`
  position: fixed;
  height: 100%;
  width: 75px;
  background-color: ${theme.palette.primary.main};
  overflow-x: hidden;
  z-index: 99;
  transition: all 0.5s ease;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
  display: flex;
`;
export const IconContainer = styled.div`
  background-color: ${theme.palette.primary.main};
  &:hover {
    background-color: white;
  }
  width: 75px;
  align-items: center;
  display: flex;
  justify: center;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  transition: all 0.5s ease;
`;
export const AccountAvatarContainer = styled.div`
  align-items: center;
  display: flex;
  // background-color: ${() => theme.palette.background.paper};
  height: 75px;
  width: 75px;
  position: absolute;
  bottom: 0;
  margin-bottom: 20px;
`;
export const MenuContainer = styled.div`
  align-items: center;
  display: flex;
  height: 150px;
  padding: 5px;
  width: 75px;
  flex-direction: column;
`;
