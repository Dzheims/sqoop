import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import AddNewsAPIFeedForm from './DrawerContents/AddNewsAPIFeedForm';
import AddTwitterFeedForm from './DrawerContents/AddTwitterFeedForm';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '320px',
    height: '560px',
    backgroundColor: '#f7fafc',
    margin: '10px',
    borderRadius: '4px',
    padding: '8px',
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
}));

interface DrawerProps {
  drawerTitle: string;
}

const getDrawerContent = (title: string) => {
  if (title === 'Search') return <div>Pretend this is a search bar</div>;
  if (title === 'Add News Feeds') return <AddNewsAPIFeedForm />;
  if (title === 'Add Twitter Feeds') return <AddTwitterFeedForm />;
  return <div />;
};

const DrawerContentContainer: React.FC<DrawerProps> = ({
  drawerTitle,
}: DrawerProps) => {
  const classes = useStyles();

  return (
    <div className={classes.drawer}>
      <Typography className={classes.drawerTitle}>{drawerTitle}</Typography>
      {getDrawerContent(drawerTitle)}
    </div>
  );
};

export default DrawerContentContainer;
