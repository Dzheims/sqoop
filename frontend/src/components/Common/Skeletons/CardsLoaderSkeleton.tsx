import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const CardsLoaderSkeleton = () => (
  <Stack spacing={1}>
    <Skeleton variant="rectangular" width={290} height={160} />
    <Skeleton variant="rectangular" width={290} height={160} />
    <Skeleton variant="rectangular" width={290} height={160} />
  </Stack>
);

export default CardsLoaderSkeleton;
