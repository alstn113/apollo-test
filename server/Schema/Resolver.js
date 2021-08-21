import Post from "../Models/post.js";

const resolvers = {
  Query: {
    getPosts: async (parent, args, context, info) => {
      return await Post.find({});
    },
    getPost: async (parent, args, context, info) => {
      const { id } = args;
      return await Post.findById({ _id: id });
    },
  },
  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { title, body, author } = args.post;
      await Post.create({ title, body, author });
      return "CREATE A POST";
    },
    deletePost: async (parent, args, context, info) => {
      const { id } = args;
      await Post.findByIdAndRemove(id);
      return `OK YOU DELETE A Post ${id} `;
    },
    updatePost: async (parent, args, context, info) => {
      const { id } = args;
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
      const post = await Post.findByIdAndUpdate(id, updates, { new: true });
      return post;
    },
  },
};

export default resolvers;
