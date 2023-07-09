"use client";

import { Menu, Transition } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdCall, MdOutlineClose } from "react-icons/md";

const MobileMenu = async ({ session, profile }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      {session && (
        <Menu as='div' className='relative inline-block text-left md:hidden'>
          {({ open }) => (
            <>
              <div>
                <Menu.Button
                  className={`p-1 transition duration-200 text-4xl rounded-lg border ${
                    open
                      ? "border-red-900 text-red-600 transition rotate-[-90deg]"
                      : "border-blue-900 text-[#0870ad] transition"
                  } `}>
                  {open ? (
                    <MdOutlineClose aria-hidden='true' />
                  ) : (
                    <HiMenuAlt3 aria-hidden='true' />
                  )}
                </Menu.Button>
              </div>

              {/* Use the `Transition` component. */}
              <Transition
                show={open}
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'>
                {/* Mark this component as `static` */}
                <Menu.Items
                  static
                  className='origin-top-right absolute right-0 flex flex-col mt-2 rounded-lg w-56 overflow-hidden shadow-2xl ring-1 ring-black ring-opacity-5 focus:ontline-none'>
                  <Menu.Item>
                    <Link
                      href='/'
                      className='p-4 ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-gray-300 dark:ui-not-active:bg-gray-600 ui-not-active:text-black dark:ui-not-active:text-white shadow-lg'>
                      HOME
                    </Link>
                  </Menu.Item>

                  <Menu.Item>
                    <Link
                      href='/repay'
                      className='p-4 ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-gray-300 dark:ui-not-active:bg-gray-600 ui-not-active:text-black dark:ui-not-active:text-white shadow-lg'>
                      REPAY
                    </Link>
                  </Menu.Item>

                  {profile &&
                    profile.map((user) => (
                      <Menu.Item key={user.id}>
                        {user.isAdmin && (
                          <Link
                            className='p-4 ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-gray-300 dark:ui-not-active:bg-gray-600 ui-not-active:text-black dark:ui-not-active:text-white shadow-lg'
                            href='/admin'>
                            ADMIN
                          </Link>
                        )}
                      </Menu.Item>
                    ))}

                  <Menu.Item>
                    <button
                      onClick={signout}
                      className='p-4 inline-flex justify-start
                      ui-active:bg-blue-500 ui-active:text-white
                      ui-not-active:bg-gray-300 dark:ui-not-active:bg-gray-600
                      ui-not-active:text-black dark:ui-not-active:text-white
                      shadow-lg'>
                      SIGN OUT
                    </button>
                  </Menu.Item>

                  <div className='w-full flex items-center justify-between'>
                    <Menu.Item className='w-full'>
                      <a
                        href='tel:+2348079551587'
                        className='w-full inline-flex items-center justify-center p-4 ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-gray-400 dark:ui-not-active:bg-gray-700 ui-not-active:text-black dark:ui-not-active:text-blue-500 shadow-lg'>
                        <MdCall className={`  text-2xl font-semibold `} />
                      </a>
                    </Menu.Item>
                    <Menu.Item className='w-full'>
                      <a
                        href='mailto:nfvcbcoop@gmail.com'
                        className='w-full inline-flex items-center justify-center p-4 ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-gray-400 dark:ui-not-active:bg-gray-700 ui-not-active:text-black dark:ui-not-active:text-blue-500 shadow-lg'>
                        <BiMailSend className={`  text-2xl font-semibold `} />
                      </a>
                    </Menu.Item>
                    <Menu.Item className='w-full '>
                      <a
                        href='https://wa.me/2348079551587'
                        className='w-full inline-flex items-center justify-center p-4 ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-gray-400 dark:ui-not-active:bg-gray-700 ui-not-active:text-black dark:ui-not-active:text-blue-500 shadow-lg'>
                        <BsWhatsapp className={`  text-2xl font-semibold `} />
                      </a>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      )}
    </>
  );
};

export default MobileMenu;
