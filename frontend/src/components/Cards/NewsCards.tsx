import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Typography, Avatar } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  AccountNameContainer,
  NewsAPIContentContainer,
  NewsAPITitleContainer,
  useStyles,
  Item,
} from '../../pages/Boards/ColumnsStyle';
import { formatTimeAndDate, truncateName } from '../Common/Functions/Functions';
import CardsAddToCollectionButton from '../Buttons/CardsAddToCollectionButton';
import { Article } from '../../types.generated';
import FactCheckButton from '../FactCheck/FactCheckButton';
import { useDrawerState, DrawerState } from '../FactCheck/FactCheckDrawerState';

interface NewsDataProps {
  data: Article;
}

const NewsCards: React.FC<NewsDataProps> = ({ data }: NewsDataProps) => {
  const classes = useStyles();
  const { state, setState } = useDrawerState();
  const [highlightCard, setHighlightCard] = useState<boolean>(false);

  useEffect(() => {
    if (data.suggestedKeywords === state.suggestedKeyWords) {
      setHighlightCard(!highlightCard);
    } else {
      setHighlightCard(false);
    }
  }, [state.suggestedKeyWords]);

  const randomColor = (name: string) => {
    let hex = Math.floor((name.charCodeAt(0) / 250) * 0xffffff);
    let color = '#' + hex.toString(16);
    return color;
  };

  return (
    <div>
      <Draggable draggableId={data.publishedAt as string} index={0}>
        {(provided, snapshot) => (
          <Item
            className={
              highlightCard ? classes().highlightBorder : classes().border
            }
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <NewsAPITitleContainer>
              <Avatar
                style={{
                  backgroundColor: randomColor(data.sourceName as string),
                  color: 'white',
                }}
                className={classes().profileAvatars}
              >
                {data.sourceName?.charAt(0)}
              </Avatar>
              <AccountNameContainer>
                <Typography style={{ fontWeight: 600 }}>
                  {truncateName(data.sourceName as string, 18)}
                </Typography>
              </AccountNameContainer>
            </NewsAPITitleContainer>
            <Typography variant="body2">{data.description}</Typography>
            {!data.urlToImage ? (
              <a
                target="_blank"
                className={classes().link}
                href={data?.url as string}
              >
                <Typography variant="body2">{data.title}</Typography>
              </a>
            ) : (
              <NewsAPIContentContainer>
                <div
                  style={{
                    backgroundImage: `url(${data.urlToImage})`,
                  }}
                  className={classes().imageContainer}
                >
                  <a
                    target="_blank"
                    className={classes().link}
                    href={data?.url as string}
                  >
                    <OpenInNewIcon className={classes().linkIcon} />
                  </a>
                </div>
                <a
                  target="_blank"
                  className={classes().link}
                  href={data?.url as string}
                >
                  <Typography className={classes().description}>
                    {data.title}
                  </Typography>
                </a>
              </NewsAPIContentContainer>
            )}
            <br />
            <Typography className={classes().dateAndUserName}>
              {formatTimeAndDate(data.publishedAt)}
            </Typography>
            <div className={classes().buttonsContainer}>
              {/* <CardsAddToCollectionButton /> */}
              <FactCheckButton
                // setHighlightCard={setHighlightCard}
                suggestedKeywords={data.suggestedKeywords}
              />
            </div>
          </Item>
        )}
      </Draggable>
    </div>
  );
};

export default NewsCards;
