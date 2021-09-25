import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  avatar: {
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
  claimant: {
    padding: '10px',
  },
  dateAndUserName: {
    padding: '10px',
    fontSize: '14px',
    color: 'gray',
  },
  link: {
    textDecoration: 'none',
  },
  titleLink: {
    marginLeft: '10px',
  },
}));

export const CardsContainer = styled.div`
  border: thin solid lightgray;
  padding: 15px;
  margin-bottom: 10px;
  background-color: white;
`;

export const TitleContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const AuthorContainer = styled.div`
  display: block;
  padding: 5px;
`;
export const ContentContainer = styled.div`
  margin-top: 10px;
  border: thin solid lightgray;
  padding: 0px 0px 5px 0px;
`;
