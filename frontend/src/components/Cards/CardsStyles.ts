import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';

type BoardColumnContentStylesProps = {
  isDragging: boolean;
};

export const useStyles = makeStyles(() => ({
  highlightBorder: {
    border: '2px solid #f04b4c',
    transition: 'border 0.25s ease-out',
  },
  border: {
    border: 'thin solid lightgray',
    transition: 'border 0.25s ease-out',
  },
  deleteButtonDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '10px',
  },
  empty: {
    padding: '0',
  },
  profileAvatars: {
    height: '40px',
    width: '40px',
    marginRight: '10px',
  },
  cardsIcon: {
    marginLeft: 'auto',
    color: '#00acee',
  },
  verifiedIcon: {
    height: '15px',
    width: '15px',
    marginLeft: '5px',
  },
  imageContainer: {
    height: '120px',
    width: 'auto',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'gray',
  },
  description: {
    padding: '10px',
    fontSize: '14px',
    color: 'black',
  },
  date: {
    padding: '10px',
    fontSize: '14px',
    color: 'gray',
  },
  userName: {
    fontSize: '14px',
    color: 'gray',
  },
  imageList: {
    marginTop: '10px',
    width: 'auto',
    height: '150px',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 8,
    },
  },
  linkIconDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  link: {
    textDecoration: 'none',
  },
  linkIcon: {
    color: 'white',
  },
  itemContainer: {
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 8,
    },
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    height: '40px',
    alignItems: 'center',
  },
  delete: {
    marginBottom: '5px',
  },
  iconButton: {
    color: 'gray',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  columnHighlightBorder: {
    '&:focus': {
      border: '2px solid #f04b4c',
      transition: 'border 0.10s ease-out',
    },
  },
  dialogTitle: {
    color: theme.palette.secondary.main,
  },
  columnHeader: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '5px',
  },
  titleLink: {
    marginLeft: '10px',
  },
  cardsContentContainer: {
    padding: '15px',
  },
  collectionCardsContentContainer: {
    padding: '0 15px 15px 15px',
  },
  descriptionContainer: {
    width: 'auto',
    overflow: 'hidden',
  },
  openOnTwitterIcon: {
    color: 'gray',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
}));

export const iconSize = { height: '20px', width: '20px' };

export const Item = styled.div`
  padding: 0px 15px 15px 15px;
  background-color: ${(isDragging: BoardColumnContentStylesProps) =>
    isDragging ? '#fff' : '#d3e4ee'};
  border-radius: 4px;
  transition: background-color 0.25s ease-out;
  overflow: hidden;
  margin-bottom: 4px;
  &:hover {
    background-color: #f7fafc;
  }
`;

export const ResultsContainer = styled.div<BoardColumnContentStylesProps>`
  background-color: ${(isDraggingOver: BoardColumnContentStylesProps) =>
    isDraggingOver ? '#f7fafc' : null};
  transition: background-color 0.2s ease;
  padding: 5px;
  overflow: auto;
  margin-top: 5px;
  max-height: 360px;
  min-height: 10px;
`;

export const TwitterSourceNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: center;
`;
export const NewsAPIContentContainer = styled.div`
  margin-top: 10px;
  border: thin solid lightgray;
  padding: 0px 0px 5px 0px;
`;

export const SourceNameContainer = styled.div`
  display: block;
  padding: 5px;
`;

export const CardsContainer = styled.div`
  padding: 5px 0 5px 0;
  margin-bottom: 5px;
  background-color: white;
`;
export const ContentContainer = styled.div`
  margin-top: 10px;
  border: thin solid lightgray;
  padding: 0px 0px 5px 0px;
`;
