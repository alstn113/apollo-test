import Post from "../Models/post.js";

const resolvers = {
  Query: {
    getPosts: async (parent, args, context, info) => {
      return await Post.find({});
    },
    getPost: async (parent, args, context, info) => {
      const { _id } = args;
      return await Post.findById(_id);
    },
  },
  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { title, body, author } = args.post;
      const newPost = await Post.create({ title, body, author });
      return newPost;
    },
    deletePost: async (parent, args, context, info) => {
      const { _id } = args;
      const post = await Post.findByIdAndRemove(_id);
      return post;
    },
    updatePost: async (parent, args, context, info) => {
      const { _id } = args;
      const { title, body, author } = args.post;
      const updates = {};
      if (title !== undefined) {
        updates.title = title;
      }
      if (body !== undefined) {
        updates.body = body;
      }
      if (author !== undefined) {
        updates.author = author;
      }
      const post = await Post.findByIdAndUpdate(_id, updates, { new: true });
      return post;
    },
  },
};

export default resolvers;
