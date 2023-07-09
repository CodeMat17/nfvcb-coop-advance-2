"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SpinnerIcon from "../SpinnerIcon";

const RequestCard = ({
  adminEmail,
  user_id,
  ippis_no,
  full_name,
  amount,
  location,
  phone_no,
  created_at,
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [approving, setApproving] = useState(false);
  const [declining, setDeclining] = useState(false);
  const [error, setError] = useState(null);

  const declineLoan = async () => {
    setError(null);
    setDeclining(true);
    try {
      const { data, error } = await supabase
        .from("loans")
        .update({ status: "declined" })
        .eq("user_id", user_id)
        .select();

      if (error) {
        setError(error.message);
      }

      if (data) {
        toast("Loan Declined", {
          duration: 4000,
          position: "top-center",
          icon: "👍",
          style: {
            color: "white",
            background: "green",
          },
        });
        router.refresh();
      }
    } catch (error) {
      setError(error);
      console.log("error: ", error);
    } finally {
      setDeclining(false);
    }
  };

  const approveLoan = async () => {
    setError(null);
    setApproving(true);
    try {
      const { data, error } = await supabase
        .from("loans")
        .update({
          status: "approved",
          approved_by: adminEmail,
          approved_on: new Date(),
        })
        .eq("user_id", user_id)
        .select();

      if (error) {
        setError(error.message);
      }

      if (data) {
        await supabase
          .from("profiles")
          .update({
            status: "approved",
          })
          .eq("id", user_id)
          .select();

        toast("Loan Approved", {
          duration: 4000,
          position: "top-center",
          icon: "👍",
          style: {
            color: "white",
            background: "green",
          },
        });
        router.refresh();
      }
    } catch (error) {
      setError(error);
    } finally {
      setApproving(false);
    }
  };

  return (
    <div className='w-full rounded-lg p-4 shadow-md overflow-hidden bg-[#0A174E] text-[#F5D042]'>
      <div className='flex justify-between '>
        <p className='text-xl font-semibold truncate'>{amount}</p>

        <div className='text-end'>
          <p> {dayjs(created_at).format(" MMM D, YYYY")}</p>
          <p className='text-xs italic'>Applied on</p>
        </div>
      </div>

      <div className='leading-tight pt-2 font-light'>
        <p className='text-sm '>Name: {full_name}</p>
        <p className='text-sm'>IPPIS no: {ippis_no}</p>
        <p className='text-sm'>Phone no: {phone_no}</p>
        <p className='text-sm'>Zone/Centre: {location}</p>
      </div>
      <div className=' my-6 flex justify-between items-center space-x-6'>
        <button
          onClick={declineLoan}
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
          onClick={approveLoan}
          className='bg-[#F5D042] hover:bg-amber-600 text-[#0A174E] w-full rounded-full py-2'>
          {approving ? (
            <div className='flex items-center justify-center space-x-2'>
              <SpinnerIcon /> <span>approving</span>
            </div>
          ) : (
            "Approve"
          )}
        </button>
      </div>
      {error && <p className='text-xs text-center text-red-500'>{error}</p>}
    </div>
  );
};

export default RequestCard;
