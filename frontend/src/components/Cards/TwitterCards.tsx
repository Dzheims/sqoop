import React, { Key } from 'react';
import Linkify from 'react-linkify';
import { SecureLink } from 'react-secure-link';
import { decodeHTML } from 'entities';
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
} from '../../pages/Boards/ColumnsStyle';
import { formatTimeAndDate, truncateName } from '../Common/Functions/Functions';
import FactCheck from '../FactCheck/FactCheck';
import CardsAddToCollectionButton from '../Buttons/CardsAddToCollectionButton';
import { Tweet } from '../../types.generated';

interface TwitterDataProps {
  data: Tweet;
}

const TwitterCards: React.FC<TwitterDataProps> = ({
  data,
}: TwitterDataProps) => {
  const classes = useStyles();

  const itemListCols = (length: number | undefined) => {
    if (!length) return undefined;
    return length === 1 ? length : 2;
  };

  return (
    <div>
      <TwitterContentContainer>
        <Avatar
          alt={data.name as string}
          src={data.profile_image_url as string}
          className={classes.avatars}
          variant="circular"
        />
        <AccountNameContainer>
          <TwitterTitleContainer>
            <Typography style={{ fontWeight: 600 }}>
              {truncateName(data.name as string, 12)}
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
          <Typography className={classes.dateAndUserName}>
            {'@' + data.username}
          </Typography>
        </AccountNameContainer>
        <Avatar
          alt="Twitter-logo"
          src="https://static01.nyt.com/images/2014/08/10/magazine/10wmt/10wmt-superJumbo-v4.jpg"
          className={classes.twitterIcon}
        />
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
          {decodeHTML(data.text as string)}
        </Typography>
      </Linkify>
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
            <ImageListItem key={photo?.media_key} cols={1}>
              <img src={photo?.url as string} alt={photo?.type as string} />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <Typography className={classes.dateAndUserName}>
        {formatTimeAndDate(data.created_at)}
      </Typography>
      <div className={classes.buttonsContainer}>
        <FactCheck data={data.suggestedKeywords} />
        <CardsAddToCollectionButton id={data.id} />
      </div>
    </div>
  );
};

export default TwitterCards;
