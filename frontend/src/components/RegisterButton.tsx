import React from 'react'
import {useAccount} from "wagmi";
import useProfile from "@/hooks/useProfile";
import { FcApproval } from "react-icons/fc";

const RegisterButton = () => {
  const { address, isConnected } = useAccount();
  const {regStatus, registerUser, profile } = useProfile(address!)

  if (regStatus === "NOT_REGISTERED") return (
    <button className="border-2 border-gray-100 py-1.5 px-4 rounded-xl bg-opacity-30 hover:scale-x-105 hover:shadow-md hover:shadow-amber-100" onClick={registerUser}>Register</button>
  )
  return <FcApproval className="w-10 h-10" />
}

export default RegisterButton