import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';

export const iconStyle = { height: '18px', width: '18px', marginRight: '5px' };

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
    width: '285px',
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
    width: '260px',
    height: '560px',
    backgroundColor: '#f7fafc',
    margin: '24px 10px',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  drawerTitle: {
    fontSize: '18px',
    color: theme.palette.primary.main,
    marginLeft: '8px',
  },
  drawerTitleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  tooltip: {
    backgroundColor: '#f2f5f7',
    color: 'gray',
    maxWidth: '200px',
    fontSize: '12px',
  },
  arrow: {
    color: '#f2f5f7',
  },
  closeIcon: {
    color: 'gray',
  },
  contentContainer: {
    padding: '8px',
  },
  backIcon: {
    color: theme.palette.secondary.main,
  },
  drawerSubtitle: {
    fontSize: '16px',
    marginTop: '10px',
    marginLeft: '12px',
  },
  listItemButtons: {
    borderRadius: '8px',
    marginBottom: '5px',
    '&:hover': {
      border: '1px solid #f04b4c',
      backgroundColor: 'white',
      color: theme.palette.secondary.main,
    },
  },
  profileBox: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'white',
    maxHeight: '200px',
    minWidth: '200px',
    overflow: 'hidden',
    padding: '5px',
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
  margin-left: '10px';
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
