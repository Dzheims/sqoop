import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';

export const useStyles = makeStyles(() => ({
  icons: {
    height: '35px',
    width: '35px',
    color: 'white',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  selectedIcons: {
    height: '35px',
    width: '35px',
    color: theme.palette.secondary.main,
  },
  avatars: {
    height: '35px',
    width: '35px',
  },
  drawerPaper: {
    width: '325px',
    backgroundColor: '#f7fafc',
    marginLeft: '55px',
    zIndex: 200,
    display: 'flex',
  },
  backdrop: {
    zIndex: 100,
    color: '#fff',
  },
  drawer: {
    width: '280px',
    height: '560px',
    backgroundColor: '#f7fafc',
    margin: '10px',
    borderRadius: '4px',
    padding: '8px',
    overflow: 'hidden',
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
    borderRadius: '12px',
    marginBottom: '5px',
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.secondary.main,
      transition: 'all 0.5s ease',
    },
  },
  profileBox: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'white',
    minWidth: '15vh',
  },
  popover: {
    border: 'thin solid lightgray',
  },
  iconContainer: {
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  selectedIconContainer: {
    backgroundColor: 'white',
  },
}));

export const NavigationBarContainer = styled.div`
  position: fixed;
  height: 100%;
  width: 55px;
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
  width: 60px;
  align-items: center;
  display: flex;
  justify: center;
  border-bottom-left-radius: 15px;
  border-top-left-radius: 15px;
  transition: all 0.5s ease;
`;
export const AccountAvatarContainer = styled.div`
  align-items: center;
  display: flex;
  // background-color: ${() => theme.palette.background.paper};
  height: 55px;
  width: 50px;
  position: absolute;
  bottom: 0;
  margin-bottom: 20px;
`;
export const MenuContainer = styled.div`
  align-items: center;
  display: flex;
  height: 150px;
  padding: 5px;
  width: 45px;
  flex-direction: column;
  z-index: 300;
`;
