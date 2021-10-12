import React from 'react';
import { Typography, Avatar } from '@material-ui/core';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  AccountNameContainer,
  NewsAPIContentContainer,
  NewsAPITitleContainer,
  useStyles,
} from '../../pages/Boards/ColumnsStyle';
import { formatTimeAndDate, truncateName } from '../Common/Functions/Functions';
import FactCheck from '../FactCheck/FactCheck';
import CardsAddToCollectionButton from '../Buttons/CardsAddToCollectionButton';

interface NewsDataProps {
  data: any;
}

const NewsCards: React.FC<NewsDataProps> = ({ data }: NewsDataProps) => {
  const classes = useStyles();

  const randomColor = (name: string) => {
    let hex = Math.floor((name.charCodeAt(0) / 250) * 0xffffff);
    let color = '#' + hex.toString(16);
    return color;
  };

  return (
    <div>
      <NewsAPITitleContainer>
        <Avatar
          style={{
            backgroundColor: randomColor(data.sourceName),
            color: 'white',
          }}
          className={classes.avatars}
        >
          {data.sourceName?.charAt(0)}
        </Avatar>
        <AccountNameContainer>
          <Typography style={{ fontWeight: 600 }}>
            {truncateName(data.sourceName, 18)}
          </Typography>
        </AccountNameContainer>
      </NewsAPITitleContainer>
      <Typography variant="body2">{data.description}</Typography>
      {data.urlToImage === null ? (
        <a target="_blank" className={classes.link} href={data?.url as string}>
          <Typography variant="body2">{data.title}</Typography>
        </a>
      ) : (
        <NewsAPIContentContainer>
          <div
            style={{
              backgroundImage: `url(${data.urlToImage})`,
            }}
            className={classes.imageContainer}
          >
            <a
              target="_blank"
              className={classes.link}
              href={data?.url as string}
            >
              <OpenInNewIcon className={classes.linkIcon} />
            </a>
          </div>
          <a
            target="_blank"
            className={classes.link}
            href={data?.url as string}
          >
            <Typography className={classes.description}>
              {data.title}
            </Typography>
          </a>
        </NewsAPIContentContainer>
      )}
      <br />
      <Typography className={classes.dateAndUserName}>
        {formatTimeAndDate(data.publishedAt)}
      </Typography>
      <div className={classes.buttonsContainer}>
        <FactCheck data={data.suggestedKeywords} />
        {/* <CardsAddToCollectionButton /> */}
      </div>
    </div>
  );
};

export default NewsCards;
