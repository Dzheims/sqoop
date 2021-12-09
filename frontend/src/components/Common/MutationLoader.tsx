import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  loader: {
    marginRight: '10px',
  },
}));

interface MutationLoaderProps {
  color: 'inherit' | 'primary' | 'secondary' | undefined;
}

const MutationLoader: React.FC<MutationLoaderProps> = ({
  color,
}: MutationLoaderProps) => {
  const classes = useStyles();

  return (
    <div>
      <CircularProgress className={classes.loader} size={15} color={color} />
    </div>
  );
};

export default MutationLoader;
