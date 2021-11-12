import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
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
    marginTop: 0,
    padding: 0,
  },
}));

interface ColumnsListProps {
  data: GetColumnsQuery;
}

const ColumnNavigation: React.FC<ColumnsListProps> = ({
  data,
}: ColumnsListProps) => {
  const classes = useStyles();

  const defaultColumns = [
    {
      title: 'News Feed',
    },
    {
      title: 'Twitter Feed',
    },
  ];

  return (
    <div className={classes.root}>
      <List>
        {defaultColumns.map((value) => (
          <ListItem disablePadding className={classes.listItem}>
            <ListItemButton onClick={() => scrollToElement(value.title)}>
              <ListItemText primary={value.title} />
            </ListItemButton>
          </ListItem>
        ))}
        {data.getColumnResult.map((value) => (
          <ListItem disablePadding className={classes.listItem}>
            <ListItemButton onClick={() => scrollToElement(value.title)}>
              <ListItemText primary={value.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ColumnNavigation;
