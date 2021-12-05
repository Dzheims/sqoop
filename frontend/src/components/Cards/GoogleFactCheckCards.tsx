/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { Typography } from '@material-ui/core';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { CardsContainer, useStyles, ContentContainer } from './CardsStyles';
import { CollectionGoogleFactCheck, Claim } from '../../types.generated';
import { formatTimeAndDate } from '../Common/Functions/Functions';
import CardsAddToCollectionButton from '../CardsButtons/CardsAddToCollectionButton';
import DeleteCollectionContentButton from '../CardsButtons/DeleteCollectionContentButton';

interface GoogleFactCheckProps {
  data: Claim | CollectionGoogleFactCheck;
  isUnderCollections: boolean | undefined;
}

const GoogleFactCheckCards: React.FC<GoogleFactCheckProps> = ({
  data,
  isUnderCollections,
}: GoogleFactCheckProps) => {
  const classes = useStyles();
  const { __typename, ...collectionGoogleFactCheck } = data as Claim;

  return (
    <div key={data.claimDate}>
      <CardsContainer>
        <div className={classes.deleteButtonDiv}>
          {isUnderCollections ? (
            <DeleteCollectionContentButton
              data={data as CollectionGoogleFactCheck}
            />
          ) : (
            <div style={{ padding: '15px 0 0 0' }} />
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <FactCheckIcon
            style={{
              color: '#00acee',
            }}
          />
        </div>
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
            <Typography className={classes.date}>
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
        <Typography className={classes.date}>
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

export default GoogleFactCheckCards;
