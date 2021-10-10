/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';
import {
  ColumnContainer,
  Title,
  ItemContainer,
  ColumnWrapper,
  useStyles,
} from '../../pages/Boards/ColumnsStyle';
import CloseIcon from '@mui/icons-material/Close';
// import ColumnsData from './ColumnsData';
import NewsAPIColumnData from '../../pages/Boards/NewsAPIColumnData';
import TwitterAPIColumnData from '../../pages/Boards/TwitterAPIColumnData';
import CategoriesButtons from '../Categories/CategoriesButtons';
import { GetColumnsQuery } from './query.generated';
import { Category } from '../../types.generated';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import { IconButton } from '@mui/material';
import { useMutation } from '@apollo/client';
import {
  DeleteTwitterMutation,
  DeleteTwitterMutationVariables,
  DeleteNewsMutation,
  DeleteNewsMutationVariables,
  DeleteCollectionMutation,
  DeleteCollectionMutationVariables,
} from './query.generated';
import {
  DELETE_TWITTER_MUTATION,
  GET_COLUMNS_QUERY,
  DELETE_NEWS_MUTATION,
  DELETE_COLLECTION_MUTATION,
} from './query';
import { GET_COLLECTIONS_LIST_QUERY } from '../Collections/query';
import currentUserId from '../../authentication/currentUserId';
import CollectionColumnData from '../../pages/Boards/CollectionColumnData';

const getFeedType = (value: any) => {
  switch (value.__typename) {
    case 'NewsFeed':
      return (
        <NewsAPIColumnData
          keyword={value.keyword}
          country={value.country}
          category={value.category as Category}
          sources={value.sources}
        />
      );
    case 'TwitterFeed':
      return (
        <TwitterAPIColumnData keyword={value.keyword} sources={value.sources} />
      );
    case 'Collection':
      return <CollectionColumnData collectionId={value.id} />;
  }
};

interface ColumnDataProps {
  data: GetColumnsQuery;
}

interface DeleteColumnProps {
  title: string;
  id: number;
  type?: string;
}

const Columns: React.FC<ColumnDataProps> = ({ data }: ColumnDataProps) => {
  const classes = useStyles();
  const [proceedDelete, setProceedDelete] = useState(false);
  const [warningDelete, setWarningDelete] = useState(false);
  const [columnTitle, setColumnTitle] = useState('');
  const [deleteColumn, setDeleteColumn] = useState<DeleteColumnProps>({
    title: '',
    id: 0,
    type: '',
  });

  const history = useHistory();
  const onDragEnd = () => {};

  const [deleteTwitterFeed] = useMutation<
    DeleteTwitterMutation,
    DeleteTwitterMutationVariables
  >(DELETE_TWITTER_MUTATION);

  const [deleteNewsFeed] = useMutation<
    DeleteNewsMutation,
    DeleteNewsMutationVariables
  >(DELETE_NEWS_MUTATION);

  const [deleteCollection] = useMutation<
    DeleteCollectionMutation,
    DeleteCollectionMutationVariables
  >(DELETE_COLLECTION_MUTATION, {
    refetchQueries: [
      {
        query: GET_COLLECTIONS_LIST_QUERY,
        // variables: { condition: { userId: currentUserId() } },
      },
    ],
  });

  // REFACTOR LATER
  useEffect(() => {
    if (proceedDelete) {
      if (deleteColumn.type === 'TwitterFeed') {
        deleteTwitterFeed({
          variables: {
            input: {
              id: deleteColumn.id,
            },
          },
          onCompleted: () => {
            history.push('/');
          },
          refetchQueries: [{ query: GET_COLUMNS_QUERY }],
        });
      }
      if (deleteColumn.type === 'NewsFeed') {
        deleteNewsFeed({
          variables: {
            input: {
              id: deleteColumn.id,
            },
          },
          onCompleted: () => {
            history.push('/');
          },
          refetchQueries: [{ query: GET_COLUMNS_QUERY }],
        });
      }
      if (deleteColumn.type === 'Collection') {
        deleteCollection({
          variables: {
            input: {
              id: deleteColumn.id,
            },
          },
          onCompleted: () => {
            history.push('/');
          },
          refetchQueries: [{ query: GET_COLUMNS_QUERY }],
        });
      }
      setProceedDelete(false);
    }
  }, [proceedDelete]);

  const handleDelete = (props: DeleteColumnProps) => {
    setDeleteColumn({
      ...deleteColumn,
      title: props.title,
      id: props.id,
      type: props.type,
    });
    setColumnTitle(props.title);
    setWarningDelete(true);
  };

  const handleCloseDialog = () => {
    setWarningDelete(false);
  };

  return (
    <>
      <ColumnWrapper>
        {data.getColumnResult?.flatMap(
          (value) => (
            <DragDropContext onDragEnd={onDragEnd} key={value.id}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <ColumnContainer
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className={classes.titleContainer}>
                      <Title>{value.title}</Title>
                      <IconButton
                        onClick={() => {
                          handleDelete({
                            title: value.title,
                            id: value.id,
                            type: value.__typename,
                          });
                        }}
                      >
                        <CloseIcon
                          sx={{ height: '20px', width: '20px' }}
                          className={classes.iconButton}
                        />
                      </IconButton>
                    </div>
                    <ItemContainer
                      className={classes.itemContainer}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      isDragging={snapshot.isDraggingOver}
                    >
                      {getFeedType(value)}
                    </ItemContainer>
                  </ColumnContainer>
                )}
              </Droppable>
            </DragDropContext>
          )
          // ) : (
          //   <div />
          // )
        )}
      </ColumnWrapper>
      <Dialog open={warningDelete} onClose={handleCloseDialog}>
        <DialogTitle>Warning!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{columnTitle}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              setWarningDelete(false);
              setProceedDelete(true);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Columns;
