import { gql } from '@apollo/client';

const VERAFACTCHECK_SEARCH_QUERY = gql`
  query veraFactCheckSearchResult($keyword: String) {
    veraFilesFactCheck(keyword: $keyword) {
      id
      author
      category
      dateText
      description
      title
      url
      imageUrl
      imageStyle
      date
    }
  }
`;

export default VERAFACTCHECK_SEARCH_QUERY;
