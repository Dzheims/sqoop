import { useState, Key, useEffect } from 'react';
import Linkify from 'react-linkify';
import { SecureLink } from 'react-secure-link';
import { decodeHTML } from 'entities';
import TwitterIcon from '@mui/icons-material/Twitter';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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
import LinkParser from '../Common/LinkParser';
import FactCheckButton from '../FactCheck/FactCheckButton';
import AddToCollectionButton from './CardsButtons/AddToCollection/AddToCollectionButton';
import { useDrawerState } from '../FactCheck/FactCheckDrawerState';
import { CollectionTweet, Tweet, TwitterPhoto } from '../../types.generated';
import RemoveFromCollectionButton from './CardsButtons/RemoveFromCollection/RemoveFromCollectionButton';
import theme from '../../theme';
import { useCollectionsListState } from './CardsButtons/AddToCollection/CollectionsList/CollectionsListState';

interface TwitterDataProps {
  data: Tweet | CollectionTweet;
}

const TwitterCard: React.FC<TwitterDataProps> = ({
  data,
}: TwitterDataProps) => {
  const classes = useStyles();
  const { state, setState } = useDrawerState();
  const { collectionListState } = useCollectionsListState();
  const [highlightCard, setHighlightCard] = useState<boolean>(false);

  const { __typename, ...collectionTweet } = data as Tweet;
  const url = `https://twitter.com/${data.username}/status/${data.tweetId}`;
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
      <CardsContainer
        key={data.tweetId}
        className={highlightCard ? classes.highlightBorder : classes.border}
      >
        <div className={classes.deleteButtonDiv}>
          {data.__typename === 'CollectionTweet' ? (
            <RemoveFromCollectionButton data={data} />
          ) : (
            <div />
          )}
        </div>
        {/*TODO FIX OPEN ON TWITTER COMPONENT*/}
        <div className={classes.linkIconDiv}>
          <a target="_blank" className={classes.link} href={url as string}>
            Open on Twitter
          </a>
        </div>
        <div
          className={
            data.__typename === 'CollectionTweet'
              ? classes.collectionCardsContentContainer
              : classes.cardsContentContainer
          }
        >
          <TwitterContentContainer>
            <Avatar
              alt={data.name as string}
              src={data.profileImageUrl as string}
              className={classes.profileAvatars}
              variant="circular"
            />
            <AccountNameContainer>
              <TwitterTitleContainer>
                <Typography style={{ fontWeight: 600 }}>
                  {truncateName(data.name as string, 13)}
                </Typography>
                {data.verified ? (
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
                {'@' + data.username}
              </Typography>
            </AccountNameContainer>
            <TwitterIcon className={classes.cardsIcon} />
          </TwitterContentContainer>
          <LinkParser>
            <Typography variant="body2">
              {decodeHTML(data.text as string)}
            </Typography>
          </LinkParser>
          {!data.photos?.length ||
          data.photos?.some((photo: any) => photo?.url === null) ? (
            <div />
          ) : (
            <ImageList
              className={classes.imageList}
              rowHeight={140}
              cols={itemListCols(data.photos?.length)}
            >
              {data.photos?.map((photo: any) => (
                <ImageListItem key={photo?.mediaKey} cols={1}>
                  <img src={photo?.url as string} alt={photo?.type as string} />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <Typography className={classes.date}>
            {formatTimeAndDate(data.publishedAt)}
          </Typography>
          <div className={classes.buttonsContainer}>
            <FactCheckButton suggestedKeywords={data.suggestedKeywords} />
            <AddToCollectionButton
              data={
                {
                  ...collectionTweet,
                  __typename: 'CollectionTweet',
                  collectionId: collectionListState.collectionId,
                } as CollectionTweet
              }
            />
          </div>
        </div>
      </CardsContainer>
    </div>
  );
};

export default TwitterCard;
