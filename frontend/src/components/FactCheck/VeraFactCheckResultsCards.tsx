import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { VeraFactCheckSearchResultQuery } from './query.generated';
import {
  CardsContainer,
  TitleContainer,
  AuthorContainer,
  useStyles,
  ContentContainer,
} from './FactCheckStyles';
import VeraFilesLogo from '../../assets/vera_files_logo.png';

interface VeraFactCheckProps {
  data: VeraFactCheckSearchResultQuery;
}

const VeraFactCheckResultsCards: React.FC<VeraFactCheckProps> = ({
  data,
}: VeraFactCheckProps) => {
  const classes = useStyles();

  const formatTimeAndDate = (date: any) => {
    const createdAtDate = new Date(date);
    const formattedCreateDate = `${createdAtDate.toLocaleTimeString()} ${createdAtDate.toDateString()}`;
    return formattedCreateDate;
  };

  return (
    <div>
      {data.veraFilesFactCheck.map((value) => (
        <CardsContainer>
          <TitleContainer>
            <Avatar className={classes.avatar} src={VeraFilesLogo} />
            <AuthorContainer>
              <Typography style={{ fontWeight: 600 }}>
                {value.author}
              </Typography>
            </AuthorContainer>
          </TitleContainer>
          <Typography variant="body2">{value.title}</Typography>
          <ContentContainer>
            <div
              style={{
                backgroundImage: `url(${value.imageUrl as string})`,
              }}
              className={classes.imageContainer}
            >
              <Typography className={classes.description}>
                {value.description}
              </Typography>
            </div>
          </ContentContainer>
          <br />
          <Typography className={classes.dateAndUserName}>
            {formatTimeAndDate(value.date)}
          </Typography>
        </CardsContainer>
      ))}
    </div>
  );
};

export default VeraFactCheckResultsCards;