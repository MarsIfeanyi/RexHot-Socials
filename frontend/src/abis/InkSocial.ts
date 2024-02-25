import { Abi } from "viem";

const abi: Abi = [
  {
    inputs: [
      { internalType: "address", name: "_rexHotToken", type: "address" },
      { internalType: "address", name: "_treasury", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_followed",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_follower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_currentFollowerCount",
        type: "uint256",
      },
    ],
    name: "NewFollow",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_postId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_timePosted",
        type: "uint256",
      },
    ],
    name: "NewPost",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "_to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Tipped",
    type: "event",
  },
  {
    inputs: [{ internalType: "string", name: "_content", type: "string" }],
    name: "createPost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_postId", type: "uint256" }],
    name: "getPost",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "poster", type: "address" },
          { internalType: "string", name: "content", type: "string" },
          { internalType: "uint256", name: "timePosted", type: "uint256" },
          { internalType: "uint256", name: "tips", type: "uint256" },
        ],
        internalType: "struct RexHot.Post",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_start", type: "uint256" },
      { internalType: "uint256", name: "_end", type: "uint256" },
    ],
    name: "getPosts",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "poster", type: "address" },
          { internalType: "string", name: "content", type: "string" },
          { internalType: "uint256", name: "timePosted", type: "uint256" },
          { internalType: "uint256", name: "tips", type: "uint256" },
        ],
        internalType: "struct RexHot.Post[]",
        name: "p",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUser",
    outputs: [
      {
        components: [
          { internalType: "address", name: "user", type: "address" },
          { internalType: "uint256", name: "totalTips", type: "uint256" },
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint8", name: "status", type: "uint8" },
          {
            components: [
              { internalType: "uint256", name: "id", type: "uint256" },
              { internalType: "address", name: "poster", type: "address" },
              { internalType: "string", name: "content", type: "string" },
              { internalType: "uint256", name: "timePosted", type: "uint256" },
              { internalType: "uint256", name: "tips", type: "uint256" },
            ],
            internalType: "struct RexHot.Post[]",
            name: "posts",
            type: "tuple[]",
          },
        ],
        internalType: "struct RexHot.User",
        name: "u",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUserPosts",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "poster", type: "address" },
          { internalType: "string", name: "content", type: "string" },
          { internalType: "uint256", name: "timePosted", type: "uint256" },
          { internalType: "uint256", name: "tips", type: "uint256" },
        ],
        internalType: "struct RexHot.Post[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "register",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_dst", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint256", name: "_postId", type: "uint256" },
    ],
    name: "tipOnPost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasury",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];


export type inkFns =
  | "treasury"
  | "tipOnPost"
  | "register"
  | "getUserPosts"
  | "getUser"
  | "getPosts"
  | "getPost"
  | "createPost";

export default abi;
