import { gql } from '@apollo/client';

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query getSubredditByTopic($topic: String!) {
    subredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query getAllPosts {
    postList {
      id
      title
      body
      image
      created_at
      subreddit_id
      username
    }
  }
`;
