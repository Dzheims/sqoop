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
import VeraFilesLogo from '../../assets/veraFilesLogo.webp';

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
            <Avatar className={classes.profileAvatars} src={VeraFilesLogo} />
            <SourceNameContainer>
              <Typography style={{ fontWeight: 600 }}>Vera Files</Typography>
            </SourceNameContainer>
            <FactCheckIcon className={classes.cardsIcon} />
          </TitleContainer>
          <ContentContainer>
            {data.imageUrl !== null ? (
              <div>
                <div
                  style={{
                    backgroundImage: `url(${String(data.imageUrl)})`,
                  }}
                  className={classes.imageContainer}
                />
                <Typography className={classes.description}>
                  {data.description}
                </Typography>
              </div>
            ) : (
              <Typography className={classes.description}>
                {data.description}
              </Typography>
            )}
          </ContentContainer>
          <div style={{ marginTop: '10px' }}>
            <a
              className={classes.link}
              target="_blank"
              rel="noreferrer"
              href={data.url as string}
            >
              <Typography variant="body2" className={classes.titleLink}>
                {decodeHTML(data.title as string)}
              </Typography>
            </a>
          </div>
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
