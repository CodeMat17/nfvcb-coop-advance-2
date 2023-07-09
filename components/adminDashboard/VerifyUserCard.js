"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SpinnerIcon from "../SpinnerIcon";

const VerifyUserCard = ({ id, full_name, ippis_no, phone_no, location }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [verifying, setVerifying] = useState(false);
  const [declining, setDeclining] = useState(false);
  const [error, setError] = useState(null);

  const declineVerification = async () => {
    setError(null);
    setDeclining(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({ verify: "declined" })
        .eq("id", id)
        .select();

      if (error) {
        setError(error.message);
      }

      if (data) {
        router.refresh();
      }
    } catch (error) {
      setError(error);
      console.log("error: ", error);
    } finally {
      setDeclining(false);
    }
  };

  const verifyUser = async () => {
    setError(null);
    setVerifying(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({ verify: "verified" })
        .eq("id", id)
        .select();

      if (error) {
        setError(error.message);
      }

      if (data) {
        router.refresh();
      }
    } catch (error) {
      setError(error);
      console.log("error: ", error);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className='w-full rounded-lg p-4 shadow-md overflow-hidden bg-[#0A174E] text-[#F5D042]'>
      <p className='text-xl font-semibold truncate'>{full_name}</p>
      <div className='leading-tight py-2 font-light'>
        <p className='text-sm'>IPPIS no: {ippis_no}</p>
        <p className='text-sm'>Phone no: {phone_no}</p>
        <p className='text-sm'>Zone/Centre: {location}</p>
      </div>
      <div className=' my-4 flex justify-between items-center space-x-6'>
        <button
          onClick={declineVerification}
          className='border border-gray-500 hover:bg-red-100 text-red-600 w-full rounded-full py-2'>
          {declining ? (
            <div className='flex items-center justify-center space-x-2'>
              <SpinnerIcon /> <span>declining</span>
            </div>
          ) : (
            "Decline"
          )}
        </button>
        <button
          onClick={verifyUser}
          className='bg-[#F5D042] hover:bg-amber-600 text-[#0A174E] w-full rounded-full py-2'>
          {verifying ? (
            <div className='flex items-center justify-center space-x-2'>
              <SpinnerIcon /> <span>verifying</span>
            </div>
          ) : (
            "Verify"
          )}
        </button>
      </div>
      {error && <p className='text-xs text-center text-red-500'>{error}</p>}
    </div>
  );
};

export default VerifyUserCard;
