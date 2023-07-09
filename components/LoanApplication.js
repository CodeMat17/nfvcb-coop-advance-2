"use client";

import SpinnerIcon from "@/components/SpinnerIcon";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const LoanApplication = ({
  id,
  full_name,
  ippis_no,
  phone_no,
  location,
  status,
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noAmount, setNoAmount] = useState(false);
  const [loanData, setLoanData] = useState(null);
  const [showCard, setShowCard] = useState(true);

  const switchCard = () => {
    if (showCard) {
      setShowCard(false);
    } else {
      setShowCard(true);
    }
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    const getLoanData = async () => {
      const { data } = await supabase
        .from("loans")
        .select("user_id, amount, approved_on")
        .eq("user_id", id);
      setLoanData(data);
    };
    getLoanData();
  }, [id, supabase]);

  const loanRequest = async () => {
    setNoAmount(false);
    if (amount === "") {
      setNoAmount(true);
    } else {
      try {
        setLoading(true);
        const { error } = await supabase.from("loans").upsert({
          user_id: id,
          amount,
          full_name,
          location,
          ippis_no,
          phone_no,
        });
        if (!error) {
          await supabase
            .from("profiles")
            .update({ status: "processing" })
            .eq("id", id);

          toast("Your request has been received!", {
            duration: 4000,
            position: "top-center",
            icon: "👍",
            style: {
              color: "white",
              background: "#84b43a",
            },
          });
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
        router.refresh();
      }
    }
  };

  return (
    <div className='w-full pb-8'>
      <Toaster />
      {status === "inactive" && (
        <div className='max-w-md mx-auto'>
          {showCard ? (
            <div>
              {" "}
              <h2 className='text-xl font-semibold text-center pt-4 '>
                Welcome, {full_name}
              </h2>
              <h3 className='text-center pb-6 text-gray-500'>
                Do you want to take a loan now?
              </h3>
              <div className='flex flex-col items-center justify-center'>
                <Image
                  alt='question'
                  width={250}
                  height={200}
                  src='/thinking.svg'
                />
              </div>
              <div className='flex flex-col justify-center items-center pt-2'>
                <button
                  onClick={switchCard}
                  className='bg-[#0A174E] dark:bg-[#F5D042] text-[#F5D042] dark:text-[#0A174E] hover:bg-blue-900 dark:hover:bg-amber-600 rounded-full px-6 py-3'>
                  Apply
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className='text-center text-2xl text-light'>
                Loan Request Form
              </p>
              <div className='flex flex-col mt-4'>
                <label>Name:</label>
                <input
                  readOnly
                  value={full_name}
                  className='disabled cursor-not-allowed bg-gray-100 dark:bg-gray-300 text-gray-500 px-3 py-2 rounded-lg'
                />
              </div>
              <div className='flex flex-col mt-2'>
                <label>IPPIS No:</label>
                <input
                  readOnly
                  value={ippis_no}
                  className='disabled cursor-not-allowed bg-gray-100 dark:bg-gray-300 text-gray-500 px-3 py-2 rounded-lg'
                />
              </div>
              <div className='mt-2'>
                <label>Amount:</label>
                <select
                  id='amount'
                  value={amount}
                  onChange={handleAmount}
                  className='w-full border-2 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 block'>
                  <option value=''>Select amount</option>
                  <option value='₦5,000'>₦5,000</option>
                  <option value='₦10,000'>₦10,000</option>
                  <option value='₦15,000'>₦15,000</option>
                  <option value='₦20,000'>₦20,000</option>
                  <option value='₦25,000'>₦25,000</option>
                  <option value='₦30,000'>₦30,000</option>
                  <option value='₦35,000'>₦35,000</option>
                  <option value='₦40,000'>₦40,000</option>
                  <option value='₦45,000'>₦45,000</option>
                  <option value='₦50,000'>₦50,000</option>
                </select>
              </div>
              <div className='py-4 text-sm text-red-500'>
                <p className='font-semibold'>Terms and conditions</p>
                <ul>
                  <li className='mb-1'>
                    *{" "}
                    <span className='text-gray-500'>
                      5% of loan amount will be deducted from source as
                      commission.
                    </span>{" "}
                  </li>
                  <li>
                    *{" "}
                    <span className='text-gray-500'>
                      Loan payback duration is 3 mount starting from the date of
                      approval.
                    </span>{" "}
                  </li>
                </ul>
                <div className='mt-2'>
                  <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={handleCheckbox}
                  />
                  <label className='text-black dark:text-white'>
                    {" "}
                    I accept the terms and conditions.
                  </label>
                </div>
              </div>
              {noAmount && (
                <p className='text-center text-sm text-red-500 bg-red-100 p-2 rounded-lg'>
                  😕 Select a valid amount.
                </p>
              )}
              <div className={"my-6 text-white "}>
                <button
                  onClick={loanRequest}
                  disabled={!isChecked}
                  className={`${
                    !isChecked ? "opacity-25 cursor-not-allowed" : ""
                  } bg-blue-700 hover:bg-blue-700 w-full rounded-full py-3`}>
                  {loading ? (
                    <div className='flex justify-center items-center gap-x-3'>
                      <SpinnerIcon />
                      <p>Submitting</p>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {status === "processing" && (
        <div className='max-w-md mx-auto'>
          <p className='pt-2 pb-6 text-center font-semibold text-2xl'>
            Good news!
          </p>
          <div className='border dark:border-gray-700 p-6 rounded-lg drop-shadow-lg'>
            <p className='text-center'>
              {full_name}, your loan request has been received and is being
              processed at the moment. So, sit back and check later for the
              decision of the executives.
            </p>
            <p className='text-center text-4xl pt-6'>✌️</p>
          </div>
        </div>
      )}

      {status === "approved" && (
        <div className='max-w-md mx-auto'>
          <p className='text-center text-4xl pb-4'> 🤩</p>
          <div className='overflow-hidden border dark:border-gray-700 rounded-lg drop-shadow-lg'>
            <div className='p-6'>
              <p className='py-2 text-center truncate text-2xl'>{full_name},</p>
              <p className='text-center'>
                your loan request has been approved.
              </p>
            </div>
            {loanData &&
              loanData.map((loan) => (
                <div key={loan.user_id} className='bg-blue-900 p-6 text-white'>
                  <p>Amount: {loan.amount}</p>
                  <p>
                    Approved on:{" "}
                    {dayjs(loan.approved_on).format(" MMM D, YYYY")}
                  </p>
                  <p>
                    Repayment duration: 3 months{" "}
                    <span className='text-sm text-blue-300 '>
                      (from date of approval).
                    </span>{" "}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApplication;
