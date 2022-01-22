import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';

export const iconStyle = { height: '18px', width: '18px', marginRight: '5px' };

export const useStyles = makeStyles(() => ({
  icons: {
    height: '25px',
    width: '25px',
    color: 'white',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  selectedIcons: {
    height: '25px',
    width: '25px',
    color: theme.palette.secondary.main,
  },
  avatars: {
    height: '25px',
    width: '25px',
  },
  drawerPaper: {
    width: '290px',
    backgroundColor: '#f7fafc',
    marginLeft: '40px',
    zIndex: 200,
    display: 'flex',
  },
  backdrop: {
    zIndex: 100,
    color: '#fff',
  },
  drawer: {
    width: '265px',
    height: '100vh',
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
      backgroundColor: '#f7fafc',
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
      backgroundColor: '#f7fafc',
    },
  },
  selectedIconContainer: {
    backgroundColor: '#f7fafc',
  },
  sqoopIcon: {
    height: '20px',
    width: '20px',
  },
  sqoopIconContainer: {
    alignItems: 'center',
    display: 'flex',
    height: '40px',
    width: '40px',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    marginTop: '20px',
  },
}));

export const NavigationBarContainer = styled.div`
  position: fixed;
  height: 100%;
  width: 40px;
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
  width: 40px;
  align-items: center;
  display: flex;
  justify-content: center;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  transition: all 0.5s ease;
`;
export const AccountAvatarContainer = styled.div`
  align-items: center;
  display: flex;
  height: 40px;
  width: 40px;
  position: absolute;
  justify-content: center;
  bottom: 0;
  margin-bottom: 20px;
`;
export const MenuContainer = styled.div`
  align-items: center;
  display: flex;
  height: 150px;
  width: 40px;
  position: absolute;
  justify-content: center;
  flex-direction: column;
  z-index: 300;
`;
