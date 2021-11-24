import React from 'react';
import { Typography } from '@material-ui/core';
import { GoogleFactCheckSearchResultQuery } from './query.generated';
import { CardsContainer, useStyles, ContentContainer } from './FactCheckStyles';
import { CollectionContent } from '../../types.generated';
import { formatTimeAndDate } from '../Common/Functions/Functions';
import CardsAddToCollectionButton from '../Buttons/CardsAddToCollectionButton';

interface GoogleFactCheckProps {
  data: GoogleFactCheckSearchResultQuery;
}

const GoogleFactCheckResultsCards: React.FC<GoogleFactCheckProps> = ({
  data,
}: GoogleFactCheckProps) => {
  const classes = useStyles();

  return (
    <div>
      {data.googleFactCheckSearch.map((value, index) => (
        <div key={value.claimDate}>
          <CardsContainer>
            <ContentContainer>
              {value.claimant !== null ? (
                <Typography
                  className={classes.claimant}
                  style={{ fontWeight: 600 }}
                  variant="body2"
                >
                  Claim by {value.claimant}
                </Typography>
              ) : (
                <div />
              )}
              <Typography className={classes.description}>
                {value.text}
              </Typography>
              {value.claimDate !== null ? (
                <Typography className={classes.dateAndUserName}>
                  Claim Date {formatTimeAndDate(value.claimDate)}
                </Typography>
              ) : (
                <div />
              )}
            </ContentContainer>
            <Typography
              style={{ fontWeight: 600 }}
              className={classes.description}
            >
              {`${value.claimReview[0]?.publisher?.name || ''} Info Rating: ${
                value.claimReview[0]?.textualRating || ''
              }`}
            </Typography>
            <a
              className={classes.link}
              target="_blank"
              rel="noreferrer"
              href={value.claimReview[0].url as string}
            >
              <Typography className={classes.titleLink} variant="body2">
                {value.claimReview[0].title}
              </Typography>
            </a>
            <Typography className={classes.dateAndUserName}>
              Review Date {formatTimeAndDate(value?.claimReview[0]?.reviewDate)}
            </Typography>
            <div style={{ marginLeft: '80%' }}>
              <CardsAddToCollectionButton data={{} as CollectionContent} />
            </div>
          </CardsContainer>
        </div>
      ))}
    </div>
  );
};

export default GoogleFactCheckResultsCards;
