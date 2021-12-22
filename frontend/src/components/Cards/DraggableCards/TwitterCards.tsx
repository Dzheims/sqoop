import React, { useState, Key, useEffect } from 'react';
import Linkify from 'react-linkify';
import { SecureLink } from 'react-secure-link';
import { decodeHTML } from 'entities';
import { Draggable } from 'react-beautiful-dnd';
import TwitterIcon from '@mui/icons-material/Twitter';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Avatar,
  ImageList,
  ImageListItem,
} from '@material-ui/core';
import {
  AccountNameContainer,
  TwitterContentContainer,
  TwitterTitleContainer,
  Item,
  useStyles,
} from '../CardsStyles';
import {
  formatTimeAndDate,
  truncateName,
} from '../../Common/Functions/Functions';
import FactCheckButton from '../../FactCheck/FactCheckButton';
import CardsAddToCollectionButton from '../../CardsButtons/CardsAddToCollectionButton';
import { useDrawerState } from '../../FactCheck/FactCheckDrawerState';
import { CollectionTweet, Tweet } from '../../../types.generated';
import DeleteCollectionContentButton from '../../CardsButtons/DeleteCollectionContentButton';
import theme from '../../../theme';

interface TwitterDataProps {
  data: Tweet;
  isUnderCollections: boolean | undefined;
  collectionTweet: CollectionTweet | null;
}

// export const useStyles = makeStyles(() => ({
//   highlightBorder: {
//     border: '2px solid #f04b4c',
//     transition: 'border 0.25s ease-out',
//   },
//   border: {
//     border: 'thin solid lightgray',
//     transition: 'border 0.25s ease-out',
//   },
//   deleteButtonDiv: {
//     marginLeft: '85.5%',
//   },
//   empty: {
//     padding: '15px 0 0 0',
//   },
//   profileAvatars: {
//     height: '40px',
//     width: '40px',
//     marginRight: '10px',
//   },
//   cardsIcon: {
//     fontSize: '5px',
//     marginLeft: 'auto',
//     color: '#00acee',
//   },
//   verifiedIcon: {
//     height: '18px',
//     width: '18px',
//     marginLeft: '5px',
//   },
//   imageContainer: {
//     height: '120px',
//     width: 'auto',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundColor: 'gray',
//   },
//   description: {
//     padding: '10px',
//     fontSize: '14px',
//     color: 'black',
//   },
//   date: {
//     padding: '10px',
//     fontSize: '14px',
//     color: 'gray',
//   },
//   userName: {
//     fontSize: '14px',
//     color: 'gray',
//   },
//   imageList: {
//     marginTop: '10px',
//     width: 'auto',
//     height: '150px',
//     '&::-webkit-scrollbar': {
//       width: '0.4em',
//     },
//     '&::-webkit-scrollbar-thumb': {
//       backgroundColor: 'rgba(0,0,0,.1)',
//       borderRadius: 8,
//     },
//   },
//   linkIconDiv: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//   },
//   link: {
//     textDecoration: 'none',
//   },
//   linkIcon: {
//     color: 'white',
//   },
//   itemContainer: {
//     '&::-webkit-scrollbar': {
//       width: '0.4em',
//     },
//     '&::-webkit-scrollbar-thumb': {
//       backgroundColor: 'rgba(0,0,0,.1)',
//       borderRadius: 8,
//     },
//   },
//   buttonsContainer: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   titleContainer: {
//     marginTop: '5px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     height: '40px',
//     alignItems: 'center',
//   },
//   delete: {
//     marginBottom: '5px',
//   },
//   iconButton: {
//     color: 'gray',
//     '&:hover': {
//       color: theme.palette.secondary.main,
//     },
//   },
//   columnHighlightBorder: {
//     '&:focus': {
//       border: '2px solid #f04b4c',
//       transition: 'border 0.10s ease-out',
//     },
//   },
//   dialogTitle: {
//     color: theme.palette.secondary.main,
//   },
//   columnHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     marginLeft: '5px',
//   },
//   titleLink: {
//     marginLeft: '10px',
//   },
//   claimant: {
//     padding: '10px',
//   },
// }));

const TwitterCards: React.FC<TwitterDataProps> = ({
  data,
  isUnderCollections,
  collectionTweet,
}: TwitterDataProps) => {
  const classes = useStyles();
  const { state, setState } = useDrawerState();
  const [highlightCard, setHighlightCard] = useState<boolean>(false);

  const {
    authorId,
    tweetId,
    name,
    profileImageUrl,
    verified,
    username,
    photos,
    publishedAt,
    suggestedKeywords,
    text,
    __typename,
  } = data as Tweet;

  useEffect(() => {
    if (suggestedKeywords === state.suggestedKeyWords) {
      setHighlightCard(!highlightCard);
    } else {
      setHighlightCard(false);
    }
  }, [state.suggestedKeyWords]);
  const itemListCols = (length: number | undefined) => {
    if (!length) return undefined;
    return length === 1 ? length : 2;
  };

  return (
    <div>
      <Draggable draggableId={authorId as string} index={0}>
        {(provided, snapshot) => (
          <Item
            className={highlightCard ? classes.highlightBorder : classes.border}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div className={classes.deleteButtonDiv}>
              {isUnderCollections ? (
                <DeleteCollectionContentButton
                  data={collectionTweet as CollectionTweet}
                />
              ) : (
                <div className={classes.empty} />
              )}
            </div>
            <TwitterContentContainer>
              <Avatar
                alt={name as string}
                src={profileImageUrl as string}
                className={classes.profileAvatars}
                variant="circular"
              />
              <AccountNameContainer>
                <TwitterTitleContainer>
                  <Typography style={{ fontWeight: 600 }}>
                    {truncateName(name as string, 13)}
                  </Typography>
                  {verified ? (
                    <Avatar
                      alt="Verified"
                      src="https://www.pngitem.com/pimgs/m/3-38867_twitter-verified-badge-twitter-verified-icon-svg-hd.png"
                      className={classes.verifiedIcon}
                    />
                  ) : (
                    <div />
                  )}
                </TwitterTitleContainer>
                <Typography className={classes.userName}>
                  {'@' + username}
                </Typography>
              </AccountNameContainer>
              <TwitterIcon className={classes.cardsIcon} />
            </TwitterContentContainer>
            <Linkify
              componentDecorator={(
                decoratedHref: string,
                decoratedText: string,
                key: Key
              ) => (
                <SecureLink target="_blank" href={decoratedHref} key={key}>
                  {decoratedText}
                </SecureLink>
              )}
            >
              <Typography variant="body2">
                {decodeHTML(text as string)}
              </Typography>
            </Linkify>
            {!photos?.length ||
            photos?.some((photo: any) => photo?.url === null) ? (
              <div />
            ) : (
              <ImageList
                className={classes.imageList}
                rowHeight={140}
                cols={itemListCols(photos?.length)}
              >
                {photos?.map((photo: any) => (
                  <ImageListItem key={photo?.mediaKey} cols={1}>
                    <img
                      src={photo?.url as string}
                      alt={photo?.type as string}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
            <Typography className={classes.date}>
              {formatTimeAndDate(data.publishedAt)}
            </Typography>
            <div className={classes.buttonsContainer}>
              <FactCheckButton
                // setHighlightCard={setHighlightCard}
                suggestedKeywords={suggestedKeywords}
              />
              <CardsAddToCollectionButton
                data={
                  {
                    tweetId,
                    __typename: 'CollectionTweet',
                  } as CollectionTweet
                }
              />
            </div>
          </Item>
        )}
      </Draggable>
    </div>
  );
};

export default TwitterCards;
