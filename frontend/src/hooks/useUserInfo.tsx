import { Address } from "viem";
import { useEffect, useState } from "react";
import {
  formatPost,
  readInkContract,
  writeInkContract,
} from "@/constants/utils";
import { IProfile } from "@/hooks/useProfile";
import usePosts from "@/hooks/usePosts";

const useProfile = (address: Address) => {
  const [profile, setProfile] = useState<IProfile>();

  useEffect(() => {
    const getUser = async () => {
      if (!address) return;
      try {
        const _profile = await readInkContract("getUser", [address]);
        const { id, posts, status, totalTips, user } = _profile as IProfile;
        setProfile({
          id: Number(id),
          posts: posts.map((post) => formatPost(post)),
          status,
          totalTips: Number(totalTips),
          user,
        });
      } catch (err) {
        console.log(err);
      }
    };

    getUser().then((r) => r);
  }, [address]);

  return { profile };
};

export default useProfile;
