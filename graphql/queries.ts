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

export const GET_POST_BY_POST_ID = gql`
  query getPostByPostId($post_id: ID!) {
    postListByPostId(post_id: $post_id) {
      id
      title
      body
      image
      created_at
      subreddit_id
      username
      comment {
        created_at
        id
        post_id
        comment
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
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
      comment {
        created_at
        id
        post_id
        comment
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_ALL_POSTS_BY_TOPIC = gql`
  query allPostsByTopic($topic: String!) {
    postListByTopic(topic: $topic) {
      id
      title
      body
      image
      created_at
      subreddit_id
      username
      comment {
        created_at
        id
        post_id
        comment
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_VOTES_BY_POST_ID = gql`
  query getVotesByPostId($post_id: ID!) {
    voteByPostId(post_id: $post_id) {
      created_at
      id
      post_id
      upvote
      username
    }
  }
`;

export const GET_SUBREDDITS_WITH_LIMIT = gql`
  query getSubredditWithLimit($limit: Int!) {
    subredditWithLimit(limit: $limit) {
      created_at
      id
      topic
    }
  }
`;
