/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  ColumnContainer,
  Title,
  ItemContainer,
  ColumnWrapper,
  useStyles,
} from './ColumnsStyle';
import { Chip } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import FeedIcon from '@mui/icons-material/Feed';
import TwitterIcon from '@mui/icons-material/Twitter';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import NewsContentsData from '../ColumnContents/NewsContentsData';
import TwitterContentsData from '../ColumnContents/TwitterContentsData';
import { GetColumnsQuery } from './query.generated';
import { Category } from '../../types.generated';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
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
import { GET_COLLECTIONS_LIST_QUERY } from '../Cards/CardsButtons/AddToCollection/CollectionsList/query';
import CollectionContentsData from '../ColumnContents/CollectionContentsData';
import currentUserId from '../../authentication/currentUserId';
import { CollectionsListStateProvider } from '../Cards/CardsButtons/AddToCollection/CollectionsList/CollectionsListState';
import { NavDrawerStateProvider } from '../SideNavigation/SideNavigationDrawerState';
import ScrollContainer from 'react-indiana-drag-scroll';

const getFeedType = (value: any) => {
  switch (value.__typename) {
    case 'NewsFeed':
      return (
        <NewsContentsData
          keyword={value.keyword}
          country={value.country}
          category={value.category as Category}
          sources={value.sources}
        />
      );
    case 'TwitterFeed':
      return (
        <TwitterContentsData keyword={value.keyword} sources={value.sources} />
      );
    case 'Collection':
      return <CollectionContentsData collectionId={value.id} />;
  }
};

const getIcon = (value: any) => {
  const iconStyle = { color: '#0036e7', height: '18px', width: '18px' };
  switch (value.__typename) {
    case 'NewsFeed':
      return <FeedIcon style={iconStyle} />;
    case 'TwitterFeed':
      return <TwitterIcon style={iconStyle} />;
    case 'Collection':
      return <CollectionsBookmarkIcon style={iconStyle} />;
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

const Column: React.FC<ColumnDataProps> = ({ data }: ColumnDataProps) => {
  const classes = useStyles();
  const [proceedDelete, setProceedDelete] = useState(false);
  const [userId] = useState(currentUserId());
  const [warningDelete, setWarningDelete] = useState(false);
  const [columnTitle, setColumnTitle] = useState('');
  const [deleteColumn, setDeleteColumn] = useState<DeleteColumnProps>({
    title: '',
    id: 0,
    type: '',
  });

  const [deleteTwitterFeed] = useMutation<
    DeleteTwitterMutation,
    DeleteTwitterMutationVariables
  >(DELETE_TWITTER_MUTATION, {
    variables: {
      input: {
        id: deleteColumn.id,
      },
    },
    onCompleted: ({}) => {
      setProceedDelete(false);
    },
    refetchQueries: [{ query: GET_COLUMNS_QUERY }],
  });

  const [deleteNewsFeed] = useMutation<
    DeleteNewsMutation,
    DeleteNewsMutationVariables
  >(DELETE_NEWS_MUTATION, {
    variables: {
      input: {
        id: deleteColumn.id,
      },
    },
    onCompleted: ({}) => {
      setProceedDelete(false);
    },
    refetchQueries: [{ query: GET_COLUMNS_QUERY }],
  });

  const [deleteCollection] = useMutation<
    DeleteCollectionMutation,
    DeleteCollectionMutationVariables
  >(DELETE_COLLECTION_MUTATION, {
    variables: {
      input: {
        id: deleteColumn.id,
      },
    },
    onCompleted: ({}) => {
      setProceedDelete(false);
    },
    refetchQueries: [
      { query: GET_COLUMNS_QUERY },
      {
        query: GET_COLLECTIONS_LIST_QUERY,
        variables: { condition: { userId: userId } },
      },
    ],
  });

  useEffect(() => {
    if (proceedDelete) {
      if (deleteColumn.type === 'TwitterFeed') {
        deleteTwitterFeed();
      }
      if (deleteColumn.type === 'NewsFeed') {
        deleteNewsFeed();
      }
      if (deleteColumn.type === 'Collection') {
        deleteCollection();
      }
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

  const getFiltersList = (value: any) => {
    switch (value.__typename) {
      case 'NewsFeed':
        return [
          value.keyword ? value.keyword : 'No Keyword',
          value.country ? value.country : 'Philippines',
          value.category ? value.category : 'General',
          value.sources ? value.sources : 'All Sources',
        ];
      case 'TwitterFeed':
        return [
          value.keyword ? value.keyword : 'No Keyword',
          value.sources ? value.sources : 'All Sources',
        ];
    }
    return [];
  };

  return (
    <CollectionsListStateProvider value={{ collectionId: 0 }}>
      <NavDrawerStateProvider value={{ isOpen: false, current: '' }}>
        <ColumnWrapper>
          {data.getColumnResult?.flatMap((value, index) => (
            <div
              key={value.createdAt}
              id={new Date(value.createdAt).toUTCString()}
              className={classes.columnHighlightBorder}
              tabIndex={-1}
            >
              <ColumnContainer>
                <div className={classes.titleContainer}>
                  <div className={classes.columnHeader}>
                    <div>{getIcon(value)}</div>
                    <Title>{value.title}</Title>
                  </div>
                  <IconButton
                    data-testid={value.title}
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
                <ScrollContainer className="scroll-container">
                  <div className={classes.chipsContainer}>
                    {getFiltersList(value).map((filter: string) => (
                      <Chip
                        className={classes.chips}
                        variant="outlined"
                        label={filter}
                      />
                    ))}
                  </div>
                </ScrollContainer>
                <ItemContainer key={index} className={classes.itemContainer}>
                  {getFeedType(value)}
                </ItemContainer>
              </ColumnContainer>
            </div>
          ))}
        </ColumnWrapper>
        <Dialog
          data-testid="warning"
          open={warningDelete}
          onClose={handleCloseDialog}
        >
          <DialogTitle className={classes.dialogTitle}>Warning!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete <strong>{columnTitle}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button data-testid="cancel-delete" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button
              data-testid="agree-delete"
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
      </NavDrawerStateProvider>
    </CollectionsListStateProvider>
  );
};

export default Column;
