import React, { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { useParams } from "next/navigation";
import usePosts from "@/hooks/usePosts";
import { IPost } from "@/components/Timeline";
import Avatar from "boring-avatars";
import { formatDate, shortenAccount } from "@/utils";
import TipInput from "@/components/TipInput";
import {formatEther} from "viem";

const Post = () => {
  const [post, setPost] = useState<IPost>();
  const params = useParams();

  const { getSinglePost } = usePosts();

  useEffect(() => {
    getSinglePost(Number(params?.id))
      .then((data) => setPost(data!))
      .catch((err) => err);
  }, [getSinglePost, params?.id]);

  if (!post) return;
  return (
    <Layout>
      <div className="py-4 px-2 text-white max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 relative">
          <div className="flex items-center gap-8">
            <Avatar name={post.poster} size={80} />
            <div>
              <p className="font-black text-lg">{post.poster}</p>
              <p className={"font-black text-lg"}>
                {formatDate(post.timePosted)}
              </p>
            </div>
          </div>
          <div className="grid gap-2">
            <p className="text-right">Total Tips: <b className="font-bold">{post.tips}</b> $Tip</p>
            <TipInput post={post} />
          </div>
        </div>
        <p className={"text-3xl px-12 py-4"}>{post.content}</p>
      </div>
    </Layout>
  );
};

export default Post;
