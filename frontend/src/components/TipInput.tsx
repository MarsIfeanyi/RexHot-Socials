import { IPost } from "@/components/Timeline";
import Use$Tip from "@/hooks/use$Tip";
import React, { FC, useState } from "react";
import {parseEther} from "viem";

const TipInput: FC<{ post: IPost }> = ({ post }) => {
  const [showTip, setShowTip] = useState(false);
  const [tipAmount, setTipAmount] = useState("");
  const { tipUser } = Use$Tip();

  const handleSendTip = async () => {
    if (tipAmount.length === 0) return;
    try {
      const hash = await tipUser(post.poster, tipAmount, post.id)
      console.log(hash);
      setShowTip(false)
      setTipAmount("")
      
    } catch (error) {
      console.log(error); 
    }
    
  };

  return (
    <div>
      <button
        className="border-2 border-gray-100 px-3 rounded-lg  hover:font-bold block ml-auto w-max"
        onClick={(e) => setShowTip(!showTip)}
      >
        Tip Post
      </button>
      <div
        className={`${
          showTip ? "flex" : "hidden"
        } absolute w-36 right-0 top-full p-1 border border-gray-500 rounded-lg bg-white bg-opacity-40 backdrop-blur-sm gap-2`}
      >
        <input
          type="number"
          step={0.01}
          value={tipAmount}
          onChange={(e) => setTipAmount(e.target.value)}
          className="rounded text-black px-2 py-0.5 w-full focus-visible:outline-0"
        />
        <button className="bg-gray-700 rounded px-2" onClick={handleSendTip}>
          Tip
        </button>
      </div>
    </div>
  );
};

export default TipInput;
