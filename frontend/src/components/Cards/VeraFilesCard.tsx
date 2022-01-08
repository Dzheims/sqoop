/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { Typography, Avatar } from '@material-ui/core';
import { decodeHTML } from 'entities';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import {
  CardsContainer,
  useStyles,
  ContentContainer,
  TitleContainer,
  SourceNameContainer,
} from './CardsStyles';
import { formatTimeAndDate } from '../Common/Functions/Functions';
import AddToCollectionButton from './CardsButtons/AddToCollection/AddToCollectionButton';
import { CollectionVeraFile, VeraFiles } from '../../types.generated';
import RemoveFromCollectionButton from './CardsButtons/RemoveFromCollection/RemoveFromCollectionButton';
import { useCollectionsListState } from './CardsButtons/AddToCollection/CollectionsList/CollectionsListState';

interface VeraFactCheckProps {
  data: VeraFiles | CollectionVeraFile;
}

const VeraFilesCard: React.FC<VeraFactCheckProps> = ({
  data,
}: VeraFactCheckProps) => {
  const classes = useStyles();
  const { collectionListState } = useCollectionsListState();
  const { __typename, ...collectionVeraFile } = data as VeraFiles;

  return (
    <div key={data.url}>
      <CardsContainer key={data.id} className={classes.border}>
        <div className={classes.deleteButtonDiv}>
          {data.__typename === 'CollectionVeraFile' ? (
            <RemoveFromCollectionButton data={data} />
          ) : (
            <div />
          )}
        </div>
        <div
          className={
            data.__typename === 'CollectionVeraFile'
              ? classes.collectionCardsContentContainer
              : classes.cardsContentContainer
          }
        >
          <TitleContainer>
            <Avatar
              className={classes.profileAvatars}
              src="https://verafiles.org/application/files/5016/0125/5608/verafiles-win8.png"
            />
            <SourceNameContainer>
              <Typography style={{ fontWeight: 600 }}>Vera Files</Typography>
            </SourceNameContainer>
            <FactCheckIcon className={classes.cardsIcon} />
          </TitleContainer>
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
          <Typography className={classes.date}>
            {formatTimeAndDate(data.date)}
          </Typography>
          <div style={{ marginLeft: '80%' }}>
            <AddToCollectionButton
              data={
                {
                  ...collectionVeraFile,
                  __typename: 'CollectionVeraFile',
                  collectionId: collectionListState.collectionId,
                } as CollectionVeraFile
              }
            />
          </div>
        </div>
      </CardsContainer>
    </div>
  );
};

export default VeraFilesCard;
