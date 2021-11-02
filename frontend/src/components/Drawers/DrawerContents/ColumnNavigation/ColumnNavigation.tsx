import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { GetColumnsQuery } from '../../../Columns/query.generated';

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

  return (
    <div className={classes.root}>
      <List>
        {data.getColumnResult.map((value) => (
          <ListItem disablePadding>
            <ListItemButton onClick={() => {}}>
              <ListItemText primary={value.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ColumnNavigation;
