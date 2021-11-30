/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { Typography } from '@material-ui/core';
import { CardsContainer, useStyles, ContentContainer } from './FactCheckStyles';
import { CollectionGoogleFactCheck, Claim } from '../../types.generated';
import { formatTimeAndDate } from '../Common/Functions/Functions';
import CardsAddToCollectionButton from '../CardsButtons/CardsAddToCollectionButton';

interface GoogleFactCheckProps {
  data: Claim | CollectionGoogleFactCheck;
}

const GoogleFactCheckResultsCards: React.FC<GoogleFactCheckProps> = ({
  data,
}: GoogleFactCheckProps) => {
  const classes = useStyles();
  const { __typename, ...collectionGoogleFactCheck } = data as Claim;

  return (
    <div key={data.claimDate}>
      <CardsContainer>
        <ContentContainer>
          {data.claimant !== null ? (
            <Typography
              className={classes.claimant}
              style={{ fontWeight: 600 }}
              variant="body2"
            >
              Claim by {data.claimant}
            </Typography>
          ) : (
            <div />
          )}
          <Typography className={classes.description}>{data.text}</Typography>
          {data.claimDate !== null ? (
            <Typography className={classes.dateAndUserName}>
              Claim Date {formatTimeAndDate(data.claimDate)}
            </Typography>
          ) : (
            <div />
          )}
        </ContentContainer>
        <Typography style={{ fontWeight: 600 }} className={classes.description}>
          {`${data.publisherName || ''} Info Rating: ${
            data.textualRating || ''
          }`}
        </Typography>
        <a
          className={classes.link}
          target="_blank"
          rel="noreferrer"
          href={data.url as string}
        >
          <Typography className={classes.titleLink} variant="body2">
            {data.title}
          </Typography>
        </a>
        <Typography className={classes.dateAndUserName}>
          Review Date {formatTimeAndDate(data.reviewDate)}
        </Typography>
        <div style={{ marginLeft: '80%' }}>
          <CardsAddToCollectionButton
            data={
              {
                ...collectionGoogleFactCheck,
                __typename: 'CollectionGoogleFactCheck',
              } as CollectionGoogleFactCheck
            }
          />
        </div>
      </CardsContainer>
    </div>
  );
};

export default GoogleFactCheckResultsCards;
