import { useQuery, gql } from "@apollo/client";
import React from "react";
import PostList from "./PostList";

const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      _id
      title
      body
      author
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error</p>;
  return data.getPosts && <PostList posts={data.getPosts} />;
};

export default React.memo(Home);
