import { useMutation, gql } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const CREATE_POST = gql`
  mutation CreatePost($post: PostInput!) {
    createPost(post: $post)
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

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { title, body, author };
    createPost({
      variables: { post },
      refetchQueries: [{ query: GET_POSTS }],
    });
  };

  const [createPost] = useMutation(CREATE_POST, { onCompleted: createPostCompleted });

  function createPostCompleted() {
    history.push("/");
  }

  return (
    <div className="create">
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Post title:</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Post body:</label>
        <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        <label>Post author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        <button>Add</button>
      </form>
    </div>
  );
};

export default React.memo(Create);
