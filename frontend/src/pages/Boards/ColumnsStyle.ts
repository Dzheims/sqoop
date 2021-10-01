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

export const useStyles = makeStyles(() => ({
  avatars: {
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
  dateAndUserName: {
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
  twitterIcon: {
    height: '20px',
    width: '20px',
    marginLeft: 'auto',
  },
  verifiedIcon: {
    height: '18px',
    width: '18px',
    marginLeft: '10px',
  },
  link: {
    textDecoration: 'none',
  },
  linkIcon: {
    height: '20px',
    width: '20px',
    marginLeft: '255px',
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
  border: thin solid lightgray;
  overflow: hidden;
`;

export const ItemContainer = styled.div`
  background-color: ${(isDraggingOver: BoardColumnContentStylesProps) =>
    isDraggingOver ? '#f7fafc' : null};
  transition: background-color 0.2s ease;
  padding: 5px;
  height: 81vh;
  overflow: auto;
`;

export const DefaultItemContainer = styled.div<DefaultColumnContentStylesProps>`
  background-color: ${(props) => (props.isDragging ? '#f7fafc' : null)};
  transition: background-color 0.2s ease;
  padding: 5px;
  height: ${(props) => (props.feedType === 'Twitter Feed' ? '81vh' : '72vh')};
  overflow: auto;
`;

export const Title = styled.h2`
  font: 18px sans-serif;
  margin-bottom: 5px;
  margin-left: 12px;
  color: ${theme.palette.primary.main};
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
  padding: 5px;
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
  margin: 10px 4px;
  height: 91.5vh;
`;
export const ColumnWrapper = styled.div`
  display: flex;
`;
export const HomeContainer = styled.div`
  display: flex;
`;
