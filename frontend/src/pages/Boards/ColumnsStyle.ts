import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../theme';

type BoardColumnContentStylesProps = {
  isDragging: boolean;
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
  },
  description: {
    padding: '10px',
    fontSize: '12px',
    color: 'gray',
  },
  dateAndUserName: {
    fontSize: '14px',
    color: 'gray',
  },
  imageList: {
    marginTop: '10px',
    width: 'auto',
    height: '150px',
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
`;

export const ItemContainer = styled.div`
  background-color: ${(isDraggingOver: BoardColumnContentStylesProps) =>
    isDraggingOver ? '#f7fafc' : null};
  transition: background-color 0.2s ease;
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
  max-height: 510px;
  overflow: auto;
`;

export const Title = styled.h2`
  font: 18px sans-serif;
  margin-bottom: 12px;
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
  flex: 1;
  padding: 8px;
  background-color: #f7fafc;
  border-radius: 4px;
  & + & {
    margin-left: 12px;
  }
  width: 350px;
  max-width: 400px;
  margin: 10px;
  height: 570px;
`;
export const ColumnWrapper = styled.div`
  display: flex;
  margin-left: 75px;
`;
