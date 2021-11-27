import { ApolloError } from '@apollo/client';
import { Maybe } from '../../../../types.generated';

export interface TitleError {
  title?: Maybe<string> | undefined;
}

export function validateTitle(title: string, error: ApolloError | undefined) {
  if (!title) {
    return 'Title must not be empty';
  }
  if (
    error?.message ===
    'duplicate key value violates unique constraint "news_feed_unique_title"'
  ) {
    console.log('duplicate news feed title');

    return 'News feed title already exists';
  }
  if (
    error?.message ===
    'duplicate key value violates unique constraint "twitter_feed_unique_title"'
  ) {
    return 'Twitter feed title already exists';
  }
  if (
    error?.message ===
    'duplicate key value violates unique constraint "collection_unique_title"'
  ) {
    return 'Collection title already exists';
  }

  return '';
}
