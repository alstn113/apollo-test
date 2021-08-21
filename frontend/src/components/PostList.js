import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <div className="post-preview" key={post._id}>
          <Link to={`/posts/${post._id}`}>
            <h2>{post.title}</h2>
            <p>Written by {post.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
