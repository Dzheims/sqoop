import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import TwitterIcon from '@mui/icons-material/Twitter';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { useNavDrawerState } from '../../../Navigation/NavDrawerState';
import { iconStyle, useStyles } from '../../../Navigation/NavigationBarStyles';

const AddFeedsButtons = [
  {
    title: 'Twitter Feed',
    icon: <TwitterIcon sx={iconStyle} />,
  },
  {
    title: 'News Feed',
    icon: <FeedIcon sx={iconStyle} />,
  },
];
const AddCollectionButton = [
  {
    title: 'Collection',
    icon: <CollectionsBookmarkIcon sx={iconStyle} />,
  },
];

const AddColumn = () => {
  const classes = useStyles();
  const { drawerState, setDrawerState } = useNavDrawerState();

  return (
    <div>
      <Typography className={classes.drawerSubtitle}>Feeds</Typography>
      <List>
        {AddFeedsButtons.map((value) => (
          <ListItem
            disablePadding
            className={classes.listItemButtons}
            key={value.title}
          >
            <ListItemButton
              onClick={() => {
                setDrawerState({
                  ...drawerState,
                  isOpen: true,
                  current: value.title,
                });
              }}
            >
              {value.icon}
              <ListItemText primary={value.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography className={classes.drawerSubtitle}>Collections</Typography>
      <List>
        {AddCollectionButton.map((value) => (
          <ListItem
            disablePadding
            className={classes.listItemButtons}
            key={value.title}
          >
            <ListItemButton
              onClick={() => {
                setDrawerState({
                  ...drawerState,
                  isOpen: true,
                  current: value.title,
                });
              }}
            >
              {value.icon}
              <ListItemText primary={value.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AddColumn;
