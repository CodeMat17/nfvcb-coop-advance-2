"use client";

import SpinnerIcon from "@/components/SpinnerIcon";
import { Dialog, Transition } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";

export default function ProfileModal({ id, email }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [full_name, setFullname] = useState("");
  const [ippis_no, setIPPISno] = useState("");
  const [phone_no, setPhoneno] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const updateProfile = async () => {
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({ email, full_name, ippis_no, phone_no, location })
        .eq("id", id)
        .select();

      if (error) {
        console.log("err msag: ", error.message);
        setError(error.message);
      } else {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-[#54B435] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
            <div className='flex-1 w-0 p-4'>
              <div className='flex items-start'>
                <div className='flex-shrink-0 pt-0.5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 47.5 47.5'
                    id='face'
                    className='w-12 h-12'>
                    <defs>
                      <clipPath id='a'>
                        <path d='M0 38h38V0H0v38Z'></path>
                      </clipPath>
                    </defs>
                    <g
                      clipPath='url(#a)'
                      transform='matrix(1.25 0 0 -1.25 0 47.5)'>
                      <path
                        fill='#ffcc4d'
                        d='M36 19c0-9.389-7.611-17-17-17C9.612 2 2 9.611 2 19c0 9.388 7.612 17 17 17 9.389 0 17-7.612 17-17'></path>
                      <path
                        fill='#664500'
                        d='M15 24.5c0-2.486-1.119-5.5-2.5-5.5S10 22.014 10 24.5c0 2.485 1.119 5.5 2.5 5.5s2.5-3.015 2.5-5.5M28 24.5c0-2.486-1.119-5.5-2.5-5.5S23 22.014 23 24.5c0 2.485 1.119 5.5 2.5 5.5s2.5-3.015 2.5-5.5M19 15c-3.623 0-6.027.422-9 1-.679.131-2 0-2-2 0-4 4.595-9 11-9 6.404 0 11 5 11 9 0 2-1.321 2.132-2 2-2.973-.578-5.377-1-9-1'></path>
                      <path
                        fill='#fff'
                        d='M10 14s3-1 9-1 9 1 9 1-2-4-9-4-9 4-9 4'></path>
                    </g>
                  </svg>
                </div>
                <div className='ml-3 flex-1'>
                  <p className='font-medium text-white'>Done!</p>
                  <p className='mt-1 text-sm text-gray-200'>
                    Your registration is now complete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ));
        setIsOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.log("catched error: ", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col justity-center'>
      <div className=' inset-0 flex justify-center mt-6 '>
        <button
          type='button'
          onClick={openModal}
          className='rounded-md bg-[#0A174E] px-4 py-3 font-medium text-white hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
          Complete your registration
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-black  p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-blue-950 dark:text-blue-600 '>
                    Profile Update
                  </Dialog.Title>
                  <p className='text-sm text-gray-700 dark:text-gray-500'>
                    {email}
                  </p>

                  {error && (
                    <div className='mt-2 p-2 text-sm text-center rounded-lg bg-red-100 text-red-500'>
                      {error}
                    </div>
                  )}

                  <form className=' py-4 group space-y-2' noValidate>
                    <div className=''>
                      {/* <span className='text-sm'>Name:</span> */}
                      <input
                        type='text'
                        name='text'
                        id='text'
                        value={full_name}
                        onChange={(e) => setFullname(e.target.value)}
                        className='w-full rounded-full border border-gray-300 dark:border-gray-600 bg-inherit px-4 py-3 shadow shadow-gray-100 dark:shadow-none appearance-none outline-none text-neutral-800 dark:text-neutral-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer'
                        placeholder='Enter your full name '
                        required
                        pattern='.{6,}'
                      />
                      <span className=' hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
                        Your full name cannot be less 6 characters
                      </span>
                    </div>

                    <div>
                      {/* <span>IPPIS no:</span> */}
                      <input
                        type='text'
                        name='text'
                        id='text'
                        maxLength='6'
                        value={ippis_no}
                        onChange={(e) => setIPPISno(e.target.value)}
                        className='w-full rounded-full border border-gray-300 dark:border-gray-600 bg-inherit px-4 py-3 shadow shadow-gray-100 dark:shadow-none appearance-none outline-none text-neutral-800 dark:text-neutral-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer'
                        placeholder='Enter your IPPIS no'
                        required
                        pattern='.{6,}'
                      />
                      <span className=' hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
                        IPPIS no is not less than 6 digits
                      </span>
                    </div>

                    <div>
                      {/* <span>IPPIS no:</span> */}
                      <input
                        type='text'
                        name='text'
                        id='text'
                        maxLength='11'
                        value={phone_no}
                        onChange={(e) => setPhoneno(e.target.value)}
                        className='w-full rounded-full border border-gray-300 dark:border-gray-600 bg-inherit px-4 py-3 shadow shadow-gray-100 dark:shadow-none appearance-none outline-none text-neutral-800 dark:text-neutral-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer'
                        placeholder='Enter your phone no'
                        required
                        pattern='.{11,}'
                      />
                      <span className=' hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
                        Your phone no. should be 11 digits
                      </span>
                    </div>

                    <div>
                      {/* <span>IPPIS no:</span> */}
                      <input
                        type='text'
                        name='text'
                        id='text'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className='w-full rounded-full border border-gray-300 dark:border-gray-600 bg-inherit px-4 py-3 shadow shadow-gray-100 dark:shadow-none appearance-none outline-none text-neutral-800 dark:text-neutral-300 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer'
                        placeholder='Enter your zone/centre'
                        required
                        pattern='.{3,}'
                      />
                      <span className=' hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block'>
                        Enter you zone/centre
                      </span>
                    </div>

                    <div className='pt-4 flex justify-between items-center'>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-full bg-red-200 px-5 py-3 font-medium  text-red-900 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={closeModal}>
                        Close
                      </button>
                      <button
                        type='button'
                        onClick={updateProfile}
                        className='inline-flex justify-center rounded-full bg-blue-200 px-5 py-3 font-medium text-blue-900 hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 group-invalid:cursor-not-allowed group-invalid:opacity-30'>
                        {loading ? (
                          <div className='flex items-center justify-center space-x-3'>
                            <SpinnerIcon />
                            <p>Submitting</p>
                          </div>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
