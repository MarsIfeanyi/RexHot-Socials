import React, { useEffect, useState } from "react";
import usePosts from "@/hooks/usePosts";
import { Address } from "viem";
import Avatar from "boring-avatars";
import { formatDate, shortenAccount } from "@/utils";
import Link from "next/link";
import { useContractRead } from "wagmi";
import { inkContract } from "@/constants/adresses";
import inkAbi, { inkFns } from "../abis/InkSocial";

export interface IPost {
  content: string;
  id: number;
  poster: Address;
  timePosted: number;
  tips: number;
}

const Timeline = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const { getAllPosts } = usePosts();

  const { data, isLoading } = useContractRead({
    address: inkContract,
    abi: inkAbi,
    functionName: "getPosts",
    args: [0, 50],
    watch: true,
    onSuccess(data) {
      setPosts(data as unknown as IPost[]);
    },
  });

  console.log(posts);

  // useEffect(() => {
  //   getAllPosts(0, 50)
  //     .then((data) => setPosts(data!))
  //     .catch((err) => err);
  // }, []);
  return (
    <div>
      <div className="grid gap-4 max-w-2xl mx-auto">
        {posts.map((post, index) => {
          if (post.poster === "0x0000000000000000000000000000000000000000")
            return;
          return (
            <div
              className="border-2 border-gray-300 rounded-lg py-4 px-2 text-white"
              key={index}
            >
              <div className="flex justify-between items-center mb-4 relative">
                <Link
                  href={`/user/${post.poster}`}
                  className="flex items-center gap-2"
                >
                  <Avatar name={post.poster} size={50} />
                  <div>
                    <p className="font-black">{shortenAccount(post.poster)}</p>
                    <p className={"text-[12px] font-black"}>
                      {/* {formatDate(post.timePosted)} */}
                    </p>
                  </div>
                </Link>
              </div>
              <Link
                href={`posts/${post.id}`}
                className={
                  "block text-lg mx-2 px-2 py-1 border border-gray-900 rounded"
                }
              >
                {post.content}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
