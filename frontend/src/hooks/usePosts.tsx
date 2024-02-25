import {
  formatPost,
  readInkContract,
  writeInkContract,
} from "@/constants/utils";
import { tryCatch } from "rxjs/internal-compatibility";
import { IPost } from "@/components/Timeline";
import { Address } from "viem";

const UsePosts = () => {
  const createPost = async (post: string) => {
    try {
      const hash = await writeInkContract("createPost", [post]);
      return hash;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPosts = async (start: number, end: number) => {
    try {
      const posts = (await readInkContract("getPosts", [
        start,
        end,
      ])) as unknown as any[];
      return posts.map((post) => formatPost(post));
    } catch (err) {
      console.log(err);
    }
  };

  const getSinglePost = async (id: number) => {
    if (id === undefined) return;
    try {
      const rawPost = await readInkContract("getPost", [id]);
      return formatPost(rawPost);
    } catch (error) {}
  };

  const getUserPosts = async (_user: Address) => {
    try {
      const posts = (await readInkContract("getPosts", [
        _user,
      ])) as unknown as any[];
      return posts.map((post) => formatPost(post));
    } catch (err) {
      console.log(err);
    }
  };

  return { createPost, getAllPosts, getSinglePost, getUserPosts };
};

export default UsePosts;
