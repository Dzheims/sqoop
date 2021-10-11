import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { decodeHTML } from 'entities';
import { VeraFactCheckSearchResultQuery } from './query.generated';
import { CardsContainer, useStyles, ContentContainer } from './FactCheckStyles';
import formatTimeAndDate from '../Common/Functions/Functions';

interface VeraFactCheckProps {
  data: VeraFactCheckSearchResultQuery;
}

const VeraFactCheckResultsCards: React.FC<VeraFactCheckProps> = ({
  data,
}: VeraFactCheckProps) => {
  const classes = useStyles();

  return (
    <div>
      {data.veraFilesFactCheck.map((value) => (
        <CardsContainer key={value.id}>
          <ContentContainer>
            <div
              style={{
                backgroundImage: `url(${String(value.imageUrl)})`,
              }}
              className={classes.imageContainer}
            />
            <a
              className={classes.link}
              target="_blank"
              rel="noreferrer"
              href={value.url as string}
            >
              <Typography color="primary" className={classes.description}>
                {decodeHTML(value.title as string)}
              </Typography>
            </a>
          </ContentContainer>
          <Typography
            style={{ fontWeight: 600, padding: '10px' }}
            variant="body2"
          >
            By {decodeHTML(value.author as string)}
          </Typography>
          <Typography className={classes.dateAndUserName}>
            {formatTimeAndDate(value.date)}
          </Typography>
        </CardsContainer>
      ))}
    </div>
  );
};

export default VeraFactCheckResultsCards;
