import { Address, parseEther } from "viem";
import { read$TipContract, write$TipContract, writeInkContract } from "@/constants/utils";
import { useAccount } from "wagmi";
import { inkContract } from "@/constants/adresses";
import {waitForTransaction} from "wagmi/actions";

const Use$Tip = () => {
  const { address: owner } = useAccount();

  const tipUser = async (to: Address, amount: string, postId: number) => {
    const amountToSend = parseEther(amount);
    const txnHashes = [];
    try {
      const allowance = await read$TipContract("allowance", [
        owner,
        inkContract,
      ]);

      console.log({ allowance, amountToSend });

      const transfer$Tip = async () => {
        console.log("---  Transfer  ---");

        const hash = await writeInkContract("tipOnPost", [
          to,
          amountToSend,
          postId,
        ]);
        return hash;
      };

      if (Number(allowance) >= Number(amountToSend)) {
        txnHashes.push(await transfer$Tip());
        console.log(txnHashes);
      } else {
        console.log("---  Approving ---");

        const txn = await write$TipContract("approve", [
          inkContract,
          amountToSend,
        ]);


        txnHashes.push(txn);
        const txn2 = await transfer$Tip();
        return txnHashes.push(txn2);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return { tipUser };
};

export default Use$Tip;
