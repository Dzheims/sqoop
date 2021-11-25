import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';

type BoardColumnContentStylesProps = {
  isDragging: boolean;
};
type DefaultColumnContentStylesProps = {
  isDragging: boolean;
  feedType: string;
};

export const useStyles = () =>
  makeStyles(() => ({
    cardsIcon: {
      fontSize: '5px',
      marginLeft: 'auto',
      color: '#00acee',
    },
    verifiedIcon: {
      height: '18px',
      width: '18px',
      marginLeft: '10px',
    },
    profileAvatars: {
      height: '40px',
      width: '40px',
      marginRight: '10px',
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
      marginTop: '10px',
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
    link: {
      textDecoration: 'none',
    },
    linkIcon: {
      height: '20px',
      width: '20px',
      marginLeft: '215px',
      marginTop: '5px',
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
    highlightBorder: {
      border: '2px solid #f04b4c',
      transition: 'border 0.25s ease-out',
    },
    columnHighlightBorder: {
      '&:focus': {
        border: '2px solid #f04b4c',
        transition: 'border 0.10s ease-out',
      },
    },
    border: {
      border: 'thin solid lightgray',
      transition: 'border 0.25s ease-out',
    },
    dialogTitle: {
      color: theme.palette.secondary.main,
    },
    columnHeader: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '5px',
    },
  }));

export const Item = styled.div`
  padding: 15px;
  background-color: ${(isDragging: BoardColumnContentStylesProps) =>
    isDragging ? '#fff' : '#d3e4ee'};
  border-radius: 4px;
  transition: background-color 0.25s ease-out;
  &:hover {
    background-color: #f7fafc;
  }
  & + & {
    margin-top: 4px;
  }
  overflow: hidden;
  margin-bottom: 4px;
`;

export const ItemContainer = styled.div`
  background-color: ${(isDraggingOver: BoardColumnContentStylesProps) =>
    isDraggingOver ? '#f7fafc' : null};
  transition: background-color 0.2s ease;
  padding: 5px;
  height: 81.5vh;
  overflow: auto;
`;

export const DefaultItemContainer = styled.div<DefaultColumnContentStylesProps>`
  background-color: ${(props) => (props.isDragging ? '#f7fafc' : null)};
  transition: background-color 0.2s ease;
  padding: 5px;
  height: ${(props) =>
    props.feedType === 'Twitter Feed' ? '81vh' : '72.75vh'};
  overflow: auto;
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

export const Title = styled.h2`
  font: 18px sans-serif;
  // margin-bottom: 5px;
  color: ${theme.palette.primary.main};
  margin-left: 5px;
`;

export const TwitterTitleContainer = styled.div`
  display: flex;
`;

export const NewsAPITitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 5px;
  margin-bottom: 5px;
`;
export const NewsAPIContentContainer = styled.div`
  margin-top: 10px;
  border: thin solid lightgray;
  padding: 0px 0px 5px 0px;
`;

export const TwitterContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const AccountNameContainer = styled.div`
  display: block;
  padding: 5px;
`;

export const ColumnContainer = styled.div`
  padding: 8px;
  background-color: #f7fafc;
  border-radius: 4px;
  width: 300px;
  max-width: 320px;
  margin: 5px 4px;
  height: 91.5vh;
`;
export const DefaultColumnContainer = styled.div`
  padding: 8px;
  background-color: #f2f5f7;
  border-radius: 4px;
  width: 300px;
  max-width: 320px;
  margin: 5px 4px;
  height: 91.5vh;
`;
export const ColumnWrapper = styled.div`
  display: flex;
`;
export const HomeContainer = styled.div`
  display: flex;
`;
