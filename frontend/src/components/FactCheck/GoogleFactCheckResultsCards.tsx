import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { GoogleFactCheckSearchResultQuery } from './query.generated';
import {
  CardsContainer,
  TitleContainer,
  AuthorContainer,
  useStyles,
  ContentContainer,
} from './FactCheckStyles';
import VeraFilesLogo from '../../assets/vera_files_logo.png';
import { Maybe } from '../../types.generated';
import formatTimeAndDate from '../Common/Functions/Functions';

interface GoogleFactCheckProps {
  data: GoogleFactCheckSearchResultQuery;
}

const GoogleFactCheckResultsCards: React.FC<GoogleFactCheckProps> = ({
  data,
}: GoogleFactCheckProps) => {
  const classes = useStyles();

  return (
    <div>
      {data.googleFactCheckSearch.map((value) => (
        <CardsContainer>
          <TitleContainer>
            <Avatar className={classes.avatar} src={VeraFilesLogo} />
            <AuthorContainer>
              <Typography style={{ fontWeight: 600 }}>
                {value.claimReview[0]?.publisher?.name}
              </Typography>
            </AuthorContainer>
          </TitleContainer>
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
            Info Rating: {value.claimReview[0]?.textualRating}
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
        </CardsContainer>
      ))}
    </div>
  );
};

export default GoogleFactCheckResultsCards;
