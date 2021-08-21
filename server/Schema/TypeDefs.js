import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Post {
    _id: ID
    title: String
    body: String
    author: String
  }

  # Queries
  type Query {
    getPosts: [Post]
    getPost(id: ID): Post
  }

  # Mutations
  input PostInput {
    title: String
    body: String
    author: String
  }

  type Mutation {
    createPost(post: PostInput): String
    deletePost(id: ID): String
    updatePost(id: ID, post: PostInput): Post
  }
`;

export default typeDefs;
