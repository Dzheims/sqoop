import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@mui/material/Fab';

const useStyles = makeStyles(() => ({
  fabButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'sticky',
    top: 30,
    zIndex: 50,
  },
}));

const fabButtonStyle = {
  position: 'absolute',
  textTransform: 'none',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  width: '125px',
  color: '#ffffff',
  backgroundColor: '#0036e7',
} as React.CSSProperties;

interface NewContentsProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const NewUnreadsButton: React.FC<NewContentsProps> = ({
  onClick,
}: NewContentsProps) => {
  const classes = useStyles();

  return (
    <div className={classes.fabButtonContainer}>
      <Fab
        style={fabButtonStyle}
        variant="extended"
        onClick={onClick}
        size="small"
      >
        New Unreads
      </Fab>
    </div>
  );
};

export default NewUnreadsButton;
