import DesktopMenu from "@/components/DesktopMenu";
import LogoComponent from "@/components/LogoComponent";
import MobileMenu from "@/components/MobileMenu";
import ThemeButton from "@/components/ThemeButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const NavHeader = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, isAdmin")
    .eq("id", session?.user?.id);

  return (
    <div className='px-4 py-2 bg-[#0A174E] relative top-0 z-40'>
      <div className='max-w-6xl mx-auto flex items-center justify-between '>
        <div className='flex items-center space-x-2'>
          <LogoComponent />
          <div className='text-[#F5D042] leading-3 text-semibold text-lg'>
            <p>COOP</p>
            <p>Advance</p>
          </div>
        </div>
        <div className='flex items-center justify-center space-x-4'>
          <ThemeButton />

          {session && (
            <div className='flex items-center space-x-2 text-[#F5D042] dark:text-white '>
              <MobileMenu session={session} profile={profile} />
              <DesktopMenu session={session} profile={profile} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavHeader;
