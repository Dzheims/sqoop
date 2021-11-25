import React, {
  useState,
  Dispatch,
  Key,
  SetStateAction,
  useEffect,
} from 'react';
import Linkify from 'react-linkify';
import { SecureLink } from 'react-secure-link';
import { decodeHTML } from 'entities';
import { Draggable } from 'react-beautiful-dnd';
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
  useStyles,
  Item,
} from '../../pages/Boards/ColumnsStyle';
import { formatTimeAndDate, truncateName } from '../Common/Functions/Functions';
import FactCheckButton from '../FactCheck/FactCheckButton';
import CardsAddToCollectionButton from '../CardsButtons/CardsAddToCollectionButton';
import { useDrawerState, DrawerState } from '../FactCheck/FactCheckDrawerState';
import { CollectionTweet, Tweet } from '../../types.generated';
import DeleteCollectionContentButton from '../CardsButtons/DeleteCollectionContentButton';

interface TwitterDataProps {
  data: Tweet;
  isUnderCollections: boolean | undefined;
}

const TwitterCards: React.FC<TwitterDataProps> = ({
  data,
  isUnderCollections,
}: TwitterDataProps) => {
  const classes = useStyles();
  const { state, setState } = useDrawerState();
  const [highlightCard, setHighlightCard] = useState<boolean>(false);

  useEffect(() => {
    if (data.suggestedKeywords === state.suggestedKeyWords) {
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
      <Draggable draggableId={data.author_id as string} index={0}>
        {(provided, snapshot) => (
          <Item
            className={
              highlightCard ? classes().highlightBorder : classes().border
            }
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div className={classes().deleteButtonDiv}>
              <TwitterContentContainer>
                <Avatar
                  alt={data.name as string}
                  src={data.profile_image_url as string}
                  className={classes().profileAvatars}
                  variant="circular"
                />
                <AccountNameContainer>
                  <TwitterTitleContainer>
                    <Typography style={{ fontWeight: 600 }}>
                      {truncateName(data.name as string, 10)}
                    </Typography>
                    {data.verified ? (
                      <Avatar
                        alt="Verified"
                        src="https://www.pngitem.com/pimgs/m/3-38867_twitter-verified-badge-twitter-verified-icon-svg-hd.png"
                        className={classes().verifiedIcon}
                      />
                    ) : (
                      <div />
                    )}
                  </TwitterTitleContainer>
                  <Typography className={classes().dateAndUserName}>
                    {'@' + data.username}
                  </Typography>
                </AccountNameContainer>
                <Avatar
                  alt="Twitter-logo"
                  src="https://static01.nyt.com/images/2014/08/10/magazine/10wmt/10wmt-superJumbo-v4.jpg"
                  className={classes().twitterIcon}
                />
              </TwitterContentContainer>
              {isUnderCollections ? <DeleteCollectionContentButton /> : <div />}
            </div>
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
                {decodeHTML(data.text as string)}
              </Typography>
            </Linkify>
            {!data.photos?.length ||
            data.photos?.some((photo: any) => photo?.url === null) ? (
              <div />
            ) : (
              <ImageList
                className={classes().imageList}
                rowHeight={140}
                cols={itemListCols(data.photos?.length)}
              >
                {data.photos?.map((photo: any) => (
                  <ImageListItem key={photo?.media_key} cols={1}>
                    <img
                      src={photo?.url as string}
                      alt={photo?.type as string}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
            <Typography className={classes().dateAndUserName}>
              {formatTimeAndDate(data.created_at)}
            </Typography>
            <div className={classes().buttonsContainer}>
              <FactCheckButton
                // setHighlightCard={setHighlightCard}
                suggestedKeywords={data.suggestedKeywords}
              />
              <CardsAddToCollectionButton
                data={
                  {
                    tweetId: data?.id,
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
