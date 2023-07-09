"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DesktopMenu = ({ session, profile }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.refresh();
    setLoading(false);
    router.push("/login");
  };

  return (
    <>
      {session && (
        <div className='hidden md:flex'>
          <div className='transition-all duration-500 space-x-1 sm:space-x-2 flex'>
            <Link
              href='/'
              className='transition duration-500 font-semibold text-[#ecbd25] hover:text-blue-900 bg-blue-900/40 hover:bg-orange-300 px-4 py-2 rounded-full'>
              HOME
            </Link>

            <Link
              href='/repay'
              className='transition duration-500 font-semibold text-[#ecbd25] hover:text-blue-900 bg-blue-900/40 hover:bg-orange-300 px-4 py-2 rounded-full'>
              REPAY
            </Link>

            {profile &&
              profile.map((user) => (
                <div key={user.id}            className='transition duration-500 font-semibold text-[#ecbd25] hover:text-blue-900 bg-blue-900/40 hover:bg-orange-300 px-4 py-2 rounded-full'>
                  {user.isAdmin && (
                    <Link
                      key={user.id}
                      href='/admin'
           >
                      ADMIN
                    </Link>
                  )}
                </div>
              ))}

            <button
              onClick={signout}
              className='text-red-500 hover:text-red-600 bg-red-200 hover:bg-red-300 px-4 py-2 rounded-full'>
              {loading ? "Signing out" : "Sign Out"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DesktopMenu;
