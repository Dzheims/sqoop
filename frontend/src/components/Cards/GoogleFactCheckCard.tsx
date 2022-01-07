/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { Typography, Avatar } from '@material-ui/core';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import {
  CardsContainer,
  useStyles,
  ContentContainer,
  TitleContainer,
  SourceNameContainer,
} from './CardsStyles';
import { CollectionGoogleFactCheck, Claim } from '../../types.generated';
import { formatTimeAndDate } from '../Common/Functions/Functions';
import AddToCollectionButton from './CardsButtons/AddToCollection/AddToCollectionButton';
import RemoveFromCollectionButton from './CardsButtons/RemoveFromCollection/RemoveFromCollectionButton';
import { useCollectionsListState } from './CardsButtons/AddToCollection/CollectionsList/CollectionsListState';

interface GoogleFactCheckProps {
  data: Claim | CollectionGoogleFactCheck;
}

const GoogleFactCheckCard: React.FC<GoogleFactCheckProps> = ({
  data,
}: GoogleFactCheckProps) => {
  const classes = useStyles();
  const { collectionListState } = useCollectionsListState();
  const { __typename, ...collectionGoogleFactCheck } = data as Claim;

  return (
    <div key={data.claimDate}>
      <CardsContainer className={classes.border}>
        <div className={classes.deleteButtonDiv}>
          {data.__typename === 'CollectionGoogleFactCheck' ? (
            <RemoveFromCollectionButton data={data} />
          ) : (
            <div />
          )}
        </div>
        <div
          className={
            data.__typename === 'CollectionGoogleFactCheck'
              ? classes.collectionCardsContentContainer
              : classes.cardsContentContainer
          }
        >
          <TitleContainer>
            <Avatar
              className={classes.profileAvatars}
              src="https://www.dtl.coventry.domains/wp-content/uploads/2020/07/Google-Logo.png"
            >
              G
            </Avatar>
            <SourceNameContainer>
              <Typography style={{ fontWeight: 600 }}>
                Google Fact Check
              </Typography>
            </SourceNameContainer>
            <FactCheckIcon className={classes.cardsIcon} />
          </TitleContainer>
          <ContentContainer>
            <Typography className={classes.description}>{data.text}</Typography>
            {data.claimant !== null ? (
              <Typography className={classes.date} variant="body2">
                Claim by {data.claimant}
              </Typography>
            ) : (
              <div />
            )}
          </ContentContainer>
          <Typography className={classes.description}>
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
            {formatTimeAndDate(data.reviewDate)}
          </Typography>
          <div style={{ marginLeft: '80%' }}>
            <AddToCollectionButton
              data={
                {
                  ...collectionGoogleFactCheck,
                  __typename: 'CollectionGoogleFactCheck',
                  collectionId: collectionListState.collectionId,
                } as CollectionGoogleFactCheck
              }
            />
          </div>
        </div>
      </CardsContainer>
    </div>
  );
};

export default GoogleFactCheckCard;
