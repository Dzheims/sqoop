/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from 'react';
import { Typography, Avatar } from '@material-ui/core';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import NewsIcon from '@mui/icons-material/Article';
import {
  SourceNameContainer,
  NewsAPIContentContainer,
  TitleContainer,
  useStyles,
  CardsContainer,
} from './CardsStyles';
import { formatTimeAndDate, truncateName } from '../Common/Functions/Functions';
import LinkParser from '../Common/LinkParser';
import AddToCollectionButton from './CardsButtons/AddToCollection/AddToCollectionButton';
import { Article, CollectionArticle } from '../../types.generated';
import FactCheckButton from '../FactCheck/FactCheckButton';
import { useDrawerState } from '../FactCheck/FactCheckDrawerState';
import RemoveFromCollectionButton from './CardsButtons/RemoveFromCollection/RemoveFromCollectionButton';
import { useCollectionsListState } from './CardsButtons/AddToCollection/CollectionsList/CollectionsListState';

interface NewsDataProps {
  data: Article | CollectionArticle;
}

const NewsCard: React.FC<NewsDataProps> = ({ data }: NewsDataProps) => {
  const classes = useStyles();
  const { state, setState } = useDrawerState();
  const { collectionListState } = useCollectionsListState();
  const [highlightCard, setHighlightCard] = useState<boolean>(false);
  const { __typename, author, content, sourceId, ...collectionArticle } =
    data as Article;

  useEffect(() => {
    if (data.suggestedKeywords === state.suggestedKeyWords) {
      setHighlightCard(!highlightCard);
    } else {
      setHighlightCard(false);
    }
  }, [state.suggestedKeyWords]);

  const randomColor = (name: string) => {
    if (!name) return '#0xffffff';
    const hex = Math.floor((name.charCodeAt(0) / 250) * 0xffffff);
    const color = `#${hex.toString(16)}`;
    return color;
  };

  return (
    <div key={data.title}>
      <CardsContainer
        key={data.title}
        className={highlightCard ? classes.highlightBorder : classes.border}
      >
        <div className={classes.deleteButtonDiv}>
          {data.__typename === 'CollectionArticle' ? (
            <RemoveFromCollectionButton data={data} />
          ) : (
            <div />
          )}
        </div>
        <div
          className={
            data.__typename === 'CollectionArticle'
              ? classes.collectionCardsContentContainer
              : classes.cardsContentContainer
          }
        >
          <TitleContainer>
            <Avatar
              style={{
                backgroundColor: randomColor(data.sourceName as string),
                color: 'white',
              }}
              className={classes.profileAvatars}
            >
              {data.sourceName?.charAt(0)}
            </Avatar>
            <SourceNameContainer>
              <Typography style={{ fontWeight: 600 }}>
                {truncateName(data.sourceName as string, 18)}
              </Typography>
            </SourceNameContainer>
            <NewsIcon className={classes.cardsIcon} />
          </TitleContainer>
          <div className={classes.descriptionContainer}>
            <LinkParser>
              <Typography variant="body2">{data.description}</Typography>
            </LinkParser>
          </div>
          {!data.urlToImage ? (
            <a
              target="_blank"
              rel="noreferrer"
              className={classes.link}
              href={data.url as string}
            >
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
                <div className={classes.linkIconDiv}>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className={classes.link}
                    href={data.url as string}
                  >
                    <OpenInNewIcon className={classes.linkIcon} />
                  </a>
                </div>
              </div>
              <a
                target="_blank"
                rel="noreferrer"
                className={classes.link}
                href={data.url as string}
              >
                <Typography className={classes.description}>
                  {data.title}
                </Typography>
              </a>
            </NewsAPIContentContainer>
          )}
          <Typography className={classes.date}>
            {formatTimeAndDate(data.publishedAt)}
          </Typography>
          <div className={classes.buttonsContainer}>
            <FactCheckButton suggestedKeywords={data.suggestedKeywords} />
            <AddToCollectionButton
              data={
                {
                  ...collectionArticle,
                  __typename: 'CollectionArticle',
                  collectionId: collectionListState.collectionId,
                } as unknown as CollectionArticle
              }
            />
          </div>
        </div>
      </CardsContainer>
    </div>
  );
};

export default NewsCard;
