/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import FeedIcon from '@mui/icons-material/Feed';
import TwitterIcon from '@mui/icons-material/Twitter';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { GetColumnsQuery } from '../../../Columns/query.generated';
import { scrollToElement } from '../../../Common/Functions/Functions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    alignItems: 'center',
    justify: 'center',
    overflow: 'auto',
    height: '500px',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'lightGray',
      borderRadius: 8,
    },
  },
  listItem: {
    borderRadius: '8px',
    '&:hover': {
      border: '1px solid #f04b4c',
      backgroundColor: 'white',
      color: theme.palette.secondary.main,
    },
  },
  icons: {
    marginRight: '5px',
    height: '15px',
    width: '15px',
  },
  formMessage: {
    color: 'gray',
    fontSize: '12px',
    margin: '5px 0 0 5px',
  },
}));

interface ColumnsListProps {
  data: GetColumnsQuery;
}

const ColumnNavigation: React.FC<ColumnsListProps> = ({
  data,
}: ColumnsListProps) => {
  const classes = useStyles();

  const getIcon = (typeName: any) => {
    const iconSize = { height: '18px', width: '18px' };
    switch (typeName) {
      case 'NewsFeed':
        return <FeedIcon sx={iconSize} className={classes.icons} />;
      case 'TwitterFeed':
        return <TwitterIcon sx={iconSize} className={classes.icons} />;
      case 'Collection':
        return (
          <CollectionsBookmarkIcon sx={iconSize} className={classes.icons} />
        );
      default:
        return <div />;
    }
  };

  const defaultColumns = [
    {
      title: 'News Feed',
      icon: (
        <FeedIcon
          sx={{ height: '18px', width: '18px' }}
          className={classes.icons}
        />
      ),
    },
    {
      title: 'Twitter Feed',
      icon: (
        <TwitterIcon
          sx={{ height: '18px', width: '18px' }}
          className={classes.icons}
        />
      ),
    },
  ];

  return (
    <div className={classes.root}>
      <Typography className={classes.formMessage}>
        Navigate to a column by just a click.
      </Typography>
      <List>
        {defaultColumns.map((value) => (
          <ListItem disablePadding className={classes.listItem}>
            <ListItemButton onClick={() => scrollToElement(value.title)}>
              {value.icon}
              <ListItemText primary={value.title} />
            </ListItemButton>
          </ListItem>
        ))}
        {data.getColumnResult.map((value) => (
          <ListItem disablePadding className={classes.listItem}>
            <ListItemButton onClick={() => scrollToElement(value.title)}>
              {getIcon(value.__typename)}
              <ListItemText primary={value.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ColumnNavigation;
