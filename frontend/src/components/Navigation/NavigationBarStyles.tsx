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
  drawerPaper: {
    width: '375px',
    backgroundColor: '#f7fafc',
    marginLeft: '75px',
    zIndex: 200,
    display: 'flex',
  },
  backdrop: {
    zIndex: 100,
    color: '#fff',
  },
  drawer: {
    width: '320px',
    height: '560px',
    backgroundColor: '#f7fafc',
    margin: '10px',
    borderRadius: '4px',
    padding: '8px',
  },
  drawerHeader: {
    display: 'flex',
  },
  drawerTitle: {
    font: '18px sans-serif',
    marginTop: '10px',
    marginLeft: '12px',
    color: theme.palette.primary.main,
  },
  contentContainer: {
    padding: '8px',
  },
  backIcon: {
    color: theme.palette.secondary.main,
  },
  drawerSubtitle: {
    font: '16px sans-serif',
    fontWeight: 600,
    marginTop: '10px',
    marginLeft: '12px',
  },
  listItemButtons: {
    '&:hover': {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main,
    },
  },
  profileBox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: theme.spacing(3),
  },
}));

export const NavigationBarContainer = styled.div`
  position: fixed;
  height: 100%;
  width: 75px;
  background-color: ${theme.palette.primary.main};
  overflow-x: hidden;
  z-index: 300;
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
  z-index: 300;
`;