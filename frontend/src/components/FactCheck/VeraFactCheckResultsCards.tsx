import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { decodeHTML } from 'entities';
import { VeraFactCheckSearchResultQuery } from './query.generated';
import {
  CardsContainer,
  TitleContainer,
  AuthorContainer,
  useStyles,
  ContentContainer,
} from './FactCheckStyles';
import VeraFilesLogo from '../../assets/vera_files_logo.png';
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
          <TitleContainer>
            <Avatar className={classes.avatar} src={VeraFilesLogo} />
            <AuthorContainer>
              <Typography style={{ fontWeight: 600 }}>
                {value.author}
              </Typography>
            </AuthorContainer>
          </TitleContainer>
          <Typography variant="body2">
            {decodeHTML(value.description as string)}
          </Typography>
          <ContentContainer>
            <div
              style={{
                backgroundImage: `url(${String(value.imageUrl)})`,
              }}
              className={classes.imageContainer}
            />
            <Typography className={classes.description}>
              {decodeHTML(value.title as string)}
            </Typography>
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
