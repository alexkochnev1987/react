import fileService from "./file-service.js";
import Post from "../models/post.js";

class PostService {
  async create(post, pic) {
    const fileName = await fileService.saveFile(pic);
    const newPost = await Post.create({ ...post, picture: fileName });
    return newPost;
  }
  async getAll() {
    const posts = await Post.find();
    return posts;
  }

  async getById(id) {
    if (!id) throw new Error({ message: "Id not found" });
    const post = await Post.findById(id);
    return post;
  }

  async update(post) {
    if (!post._id) throw new Error({ message: "Id not found" });
    const newPost = await Post.findOneAndUpdate(post._id, post, {
      new: true,
    });
    return newPost;
  }

  async delete(id) {
    if (!id) throw new Error({ message: "Id not found" });
    const post = await Post.findByIdAndDelete(id);
    return post;
  }
}

export default new PostService();
