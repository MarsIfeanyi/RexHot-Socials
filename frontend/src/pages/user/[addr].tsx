import React from "react";
import { useParams } from "next/navigation";
import useUserInfo from "@/hooks/useUserInfo";
import { Address } from "viem";
import Layout from "@/components/layout";
import Avatar from "boring-avatars";
import { formatDate, shortenAccount } from "@/utils";
import Link from "next/link";

const User = () => {
  const params = useParams();
  const { profile } = useUserInfo(params?.addr as Address);

  return (
    <Layout>
      {!profile ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-8">
          <Avatar name={profile.user} size={100} />
          <div>
            <p className="font-black text-xl">{profile.user}</p>
            <p className="text-lg font-bold"> Tips: {profile.totalTips} $TIP</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="border-b-2 border-b-gray-500 w-max py-2 mb-6 ">
              Posts
            </p>

            <div className="grid gap-4 ">
              {profile.posts.map((post) => (
                <div
                  className="border-2 border-gray-300 rounded-lg py-4 px-2 text-white"
                  key={post.id}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Avatar name={post.poster} size={50} />
                      <div>
                        <p className="font-black">
                          {shortenAccount(post.poster)}
                        </p>
                        <p className={"text-[12px] font-black"}>
                          {formatDate(post.timePosted)}
                        </p>
                      </div>
                    </div>
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
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default User;
