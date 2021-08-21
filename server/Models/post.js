import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  title: String,
  body: String,
  author: String,
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
