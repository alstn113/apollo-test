import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";

const GET_POST = gql`
  query GetPost($id: ID!) {
    getPost(id: $id) {
      _id
      title
      body
      author
    }
  }
`;
const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      _id
      title
      author
    }
  }
`;

const PostDetails = () => {
  const { id } = useParams();
  const history = useHistory();

  const { loading, error, data } = useQuery(GET_POST, { variables: { id } });

  function handleDelete() {
    if (window.confirm("이 항목을 삭제하시겠습니까?")) {
      deletePost({ variables: { id }, refetchQueries: [{ query: GET_POSTS }] });
    }
  }

  const [deletePost] = useMutation(DELETE_POST, { onCompleted: deletePostCompleted });

  function deletePostCompleted() {
    history.push("/");
  }

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error</p>;
  return (
    <div className="post-details">
      {data.getPost && (
        <article>
          <h2>{data.getPost.title}</h2>
          <p>Written by {data.getPost.author}</p>
          <div>{data.getPost.body}</div>
          <button onClick={handleDelete}>삭제</button>
        </article>
      )}
    </div>
  );
};

export default React.memo(PostDetails);
