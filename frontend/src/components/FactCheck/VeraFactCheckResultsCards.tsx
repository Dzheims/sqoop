import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { VeraFactCheckSearchResultQuery } from './query.generated';
import { CardsContainer } from './FactCheckStyles';

const useStyles = makeStyles((theme) => ({}));

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
        <CardsContainer>{value.title}</CardsContainer>
      ))}
    </div>
  );
};

export default VeraFactCheckResultsCards;
