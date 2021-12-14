import { useState, Key, useEffect } from 'react';
import Linkify from 'react-linkify';
import { SecureLink } from 'react-secure-link';
import { decodeHTML } from 'entities';
import TwitterIcon from '@mui/icons-material/Twitter';
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
  CardsContainer,
} from './CardsStyles';
import { formatTimeAndDate, truncateName } from '../Common/Functions/Functions';
import FactCheckButton from '../FactCheck/FactCheckButton';
import CardsAddToCollectionButton from '../CardsButtons/CardsAddToCollectionButton';
import { useDrawerState } from '../FactCheck/FactCheckDrawerState';
import { CollectionTweet, Tweet } from '../../types.generated';
import DeleteCollectionContentButton from '../CardsButtons/DeleteCollectionContentButton';
import theme from '../../theme';

interface TwitterDataProps {
  data: Tweet;
  isUnderCollections: boolean | undefined;
  collectionTweet: CollectionTweet | null;
}

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
    createdAt,
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
      <CardsContainer key={data.tweetId}>
        <div className={classes.deleteButtonDiv}>
          {isUnderCollections ? (
            <DeleteCollectionContentButton
              data={collectionTweet as CollectionTweet}
            />
          ) : (
            <div />
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
          <Typography variant="body2">{decodeHTML(text as string)}</Typography>
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
                <img src={photo?.url as string} alt={photo?.type as string} />
              </ImageListItem>
            ))}
          </ImageList>
        )}
        <Typography className={classes.date}>
          {formatTimeAndDate(data.createdAt)}
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
      </CardsContainer>
    </div>
  );
};

export default TwitterCards;
