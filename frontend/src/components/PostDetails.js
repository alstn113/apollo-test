import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";

const GET_POST = gql`
  query GetPost($_id: ID!) {
    getPost(_id: $_id) {
      _id
      title
      body
      author
    }
  }
`;
const DELETE_POST = gql`
  mutation DeletePost($_id: ID!) {
    deletePost(_id: $_id) {
      _id
    }
  }
`;
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

const PostDetails = () => {
  const { _id } = useParams();
  const history = useHistory();

  const { loading, error, data } = useQuery(GET_POST, { variables: { _id } });

  function handleDelete() {
    if (window.confirm("이 항목을 삭제하시겠습니까?")) {
      deletePost({
        variables: { _id },
        update: (store, { data }) => {
          const postData = store.readQuery({
            query: GET_POSTS,
          });
          store.writeQuery({
            query: GET_POSTS,
            data: {
              getPosts: postData.getPosts.filter((post) => post._id !== data.deletePost._id),
            },
          });
          const identify = store.identify(data.deletePost);
          store.evict({ id: identify });
          store.evict({ id: "ROOT_QUERY", fieldName: "getPost", args: { _id: data.deletePost._id } });
        },
      });
    }
  }

  const [deletePost] = useMutation(DELETE_POST, { onCompleted: deletePostCompleted });

  function deletePostCompleted() {
    history.push("/");
  }

  if (loading) return <p className="content loading">Loading...</p>;
  if (error) return <p className="content error">Error</p>;
  return (
    <div className="content">
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
    </div>
  );
};

export default React.memo(PostDetails);
