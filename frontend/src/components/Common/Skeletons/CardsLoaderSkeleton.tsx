import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const CardsLoaderSkeleton = () => (
  <Stack spacing={1} style={{ padding: '10px' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Skeleton animation="wave" variant="circular" width={40} height={40} />
      <Skeleton style={{ marginLeft: '10px' }} animation="wave" width="40%" />
    </div>
    <Skeleton animation="wave" style={{ marginBottom: '2px' }} />
    <Skeleton animation="wave" width="80%" />
  </Stack>
);

export default CardsLoaderSkeleton;
