"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SpinnerIcon from "../SpinnerIcon";
import toast from "react-hot-toast";

const ApprovedCard = ({
  adminEmail,
  full_name,
  amount,
  location,
  phone_no,
  created_at,
  approved_by,
  approved_on,
  user_id,
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const confirmRepay = async () => {
    setError(null);
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("loans")
        .update({
          status: "repaid",
          repayment_confirmed_by: adminEmail,
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
            status: "inactive",
          })
          .eq("id", user_id)
          .select();

        toast("Repayment confirmed", {
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
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full rounded-lg p-4 shadow-md overflow-hidden bg-[#0A174E] text-[#F5D042]'>
      <div className='leading-tight'>
        <p className='text-xl font-semibold'>{amount}</p>
        <p className='truncate'>{full_name} Chukwuemeka</p>
      </div>

    

      <div className='leading-tight italic text-sm pt-2 font-light'>
        <p>Phone no: {phone_no}</p>
        <p>Zone/Centre: {location}</p>
        <p>Applied on: {dayjs(created_at).format(" MMM D, YYYY")}</p>
        <p>Approved on: {dayjs(approved_on).format(" MMM D, YYYY")}</p>
        <p>Approved by: {dayjs(approved_by).format(" MMM D, YYYY")}</p>
      </div>
      <div className=' my-6 flex justify-between items-center space-x-6'>
        <button
          onClick={confirmRepay}
          className='bg-[#F5D042] hover:bg-amber-600 text-[#0A174E] w-full rounded-full py-2'>
          {loading ? (
            <div className='flex items-center justify-center space-x-2'>
              <SpinnerIcon /> <span>confirming</span>
            </div>
          ) : (
            "Confirm Repayment"
          )}
        </button>
      </div>
      {error && <p className='text-xs text-center text-red-500'>{error}</p>}
    </div>
  );
};

export default ApprovedCard;
