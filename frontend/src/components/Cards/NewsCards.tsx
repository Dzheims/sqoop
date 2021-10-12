import React, { Dispatch, SetStateAction } from 'react';
import { Typography, Avatar } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {
  AccountNameContainer,
  NewsAPIContentContainer,
  NewsAPITitleContainer,
  useStyles,
} from '../../pages/Boards/ColumnsStyle';
import formatTimeAndDate from '../Common/Functions/Functions';
import FactCheckButton from '../FactCheck/FactCheckButton';
import CardsActionButton from '../Buttons/CardsActionButton';

interface NewsDataProps {
  data: any;
}
interface DrawerState {
  data: any;
  open: boolean;
}

interface FactCheckProps {
  data: any;
  setDrawerState: Dispatch<SetStateAction<DrawerState>>;
}

const NewsCards: React.FC<FactCheckProps> = ({
  setDrawerState,
  data,
}: FactCheckProps) => {
  const classes = useStyles();

  const randomColor = () => {
    let hex = Math.floor(Math.random() * 0xffffff);
    let color = '#' + hex.toString(16);
    return color;
  };

  return (
    <div>
      <NewsAPITitleContainer>
        <Avatar
          style={{
            backgroundColor: randomColor(),
            color: 'white',
          }}
          className={classes.avatars}
        >
          {data.sourceName?.charAt(0)}
        </Avatar>
        <AccountNameContainer>
          <Typography style={{ fontWeight: 600 }}>{data.sourceName}</Typography>
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
        <FactCheckButton
          suggestedKeywords={data.suggestedKeywords}
          setDrawerState={setDrawerState}
        />

        <CardsActionButton />
      </div>
    </div>
  );
};

export default NewsCards;
