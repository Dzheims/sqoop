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
          <ListItem disablePadding>
            <ListItemButton onClick={() => scrollToElement(value.title)}>
              <ListItemText primary={value.title} />
            </ListItemButton>
          </ListItem>
        ))}
        {data.getColumnResult.map((value) => (
          <ListItem disablePadding>
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
