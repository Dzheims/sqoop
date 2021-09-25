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

interface GoogleFactCheckProps {
  data: GoogleFactCheckSearchResultQuery;
}

const GoogleFactCheckResultsCards: React.FC<GoogleFactCheckProps> = ({
  data,
}: GoogleFactCheckProps) => {
  const classes = useStyles();

  const formatTimeAndDate = (date: any) => {
    const createdAtDate = new Date(date);
    const formattedCreateDate = `${createdAtDate.toLocaleTimeString()} ${createdAtDate.toDateString()}`;
    return formattedCreateDate;
  };

  return (
    <div>
      {data.googleFactCheckSearch.map((value) => (
        <CardsContainer>
          <TitleContainer>
            <Avatar className={classes.avatar} src={VeraFilesLogo} />
            <AuthorContainer>
              <Typography style={{ fontWeight: 600 }}>
                {value?.claimReview[0]?.publisher?.name}
              </Typography>
            </AuthorContainer>
          </TitleContainer>
          <Typography variant="body2">
            {value?.claimReview[0]?.title}
          </Typography>
          <ContentContainer>
            <div
              style={{
                backgroundImage: `url(${value?.claimReview[0]?.url as string})`,
              }}
              className={classes.imageContainer}
            >
              <Typography className={classes.description}>
                {value.text}
              </Typography>
            </div>
          </ContentContainer>
          <br />
          <Typography className={classes.dateAndUserName}>
            {formatTimeAndDate(value?.claimReview[0]?.reviewDate)}
          </Typography>
        </CardsContainer>
      ))}
    </div>
  );
};

export default GoogleFactCheckResultsCards;
