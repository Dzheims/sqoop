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
    chipsContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2px',
    },
    chips: {
      fontSize: '12px',
      color: 'gray',
      maxWidth: '100px',
      height: '20px',
      marginLeft: '5px',
      marginTop: '5px',
    },
    keywordChip: {
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: theme.palette.secondary.main,
      maxWidth: '100px',
      height: '20px',
      marginLeft: '5px',
      marginTop: '5px',
      borderColor: theme.palette.secondary.main,
    },
  }));
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
