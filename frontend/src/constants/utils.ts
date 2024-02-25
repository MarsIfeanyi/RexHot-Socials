import { readContract, writeContract } from "@wagmi/core";
import { inkContract, inkTokenContract } from "@/constants/adresses";
import inkAbi, { inkFns } from "@/abis/InkSocial";
import $Ink, { $TipFnTypes } from "@/abis/$Ink";
import { IPost } from "@/components/Timeline";
import { Abi, TransactionReceipt, formatEther } from "viem";
import { waitForTransaction } from "wagmi/actions";

export const readInkContract = async (functionName: inkFns, args: any[] = []) =>
  await readContract({
    address: inkContract,
    abi: inkAbi,
    functionName,
    args,
  });

export const writeInkContract = async (
  functionName: inkFns,
  args: any[] = []
) =>
  await writeAndWaitContract({
    address: inkContract,
    abi: inkAbi,
    functionName,
    args,
  });

export const write$TipContract = async (
  functionName: $TipFnTypes,
  args: any[] = []
) =>
  await writeAndWaitContract({
    address: inkTokenContract,
    abi: $Ink,
    functionName,
    args,
  });

const writeAndWaitContract = async (args: {
  address: `0x${string}`;
  abi: Abi;
  functionName: $TipFnTypes | inkFns;
  args: any[];
}) => {
  const { hash } = await writeContract(args);

  return await waitForTransaction({
    hash,
  });
};

export const read$TipContract = async (
  functionName: $TipFnTypes,
  args: any[] = []
) =>
  await readContract({
    address: inkTokenContract,
    abi: $Ink,
    functionName,
    args,
  });

export const formatPost = (po: any): IPost => ({
  ...po,
  id: Number(po.id),
  timePosted: Number(po.timePosted),
  tips: formatEther(po.tips),
});
