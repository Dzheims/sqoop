import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { ColumnContainer } from '../../../pages/Boards/ColumnsStyle';

const ColumnLoaderSkeleton = () => (
  <ColumnContainer>
    <Skeleton style={{ marginTop: '10px' }} variant="text" width={150} />
  </ColumnContainer>
);

export default ColumnLoaderSkeleton;
