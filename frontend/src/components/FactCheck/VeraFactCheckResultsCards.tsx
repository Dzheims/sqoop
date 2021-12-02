/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { Typography } from '@material-ui/core';
import { decodeHTML } from 'entities';
import { CardsContainer, useStyles, ContentContainer } from './FactCheckStyles';
import { formatTimeAndDate } from '../Common/Functions/Functions';
import CardsAddToCollectionButton from '../CardsButtons/CardsAddToCollectionButton';
import { CollectionVeraFile, VeraFiles } from '../../types.generated';
import DeleteCollectionContentButton from '../CardsButtons/DeleteCollectionContentButton';

interface VeraFactCheckProps {
  data: VeraFiles | CollectionVeraFile;
  isUnderCollections: boolean | undefined;
}

const VeraFactCheckResultsCards: React.FC<VeraFactCheckProps> = ({
  data,
  isUnderCollections,
}: VeraFactCheckProps) => {
  const classes = useStyles();
  const { __typename, ...collectionVeraFile } = data as VeraFiles;

  return (
    <div key={data.url}>
      <CardsContainer key={data.id}>
        <div className={classes.deleteButtonDiv}>
          {isUnderCollections ? (
            <DeleteCollectionContentButton data={data as CollectionVeraFile} />
          ) : (
            <div style={{ padding: '15px 0 0 0' }} />
          )}
        </div>
        <ContentContainer>
          <div
            style={{
              backgroundImage: `url(${String(data.imageUrl)})`,
            }}
            className={classes.imageContainer}
          />
          <a
            className={classes.link}
            target="_blank"
            rel="noreferrer"
            href={data.url as string}
          >
            <Typography color="primary" className={classes.description}>
              {decodeHTML(data.title as string)}
            </Typography>
          </a>
        </ContentContainer>
        <Typography
          style={{ fontWeight: 600, padding: '10px' }}
          variant="body2"
        >
          By {decodeHTML(data.author as string)}
        </Typography>
        <Typography className={classes.dateAndUserName}>
          {formatTimeAndDate(data.date)}
        </Typography>
        <div style={{ marginLeft: '80%' }}>
          <CardsAddToCollectionButton
            data={
              {
                ...collectionVeraFile,
                __typename: 'CollectionVeraFile',
              } as CollectionVeraFile
            }
          />
        </div>
      </CardsContainer>
    </div>
  );
};

export default VeraFactCheckResultsCards;
