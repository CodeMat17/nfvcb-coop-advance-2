import LoanApplication from "@/components/LoanApplication";
import ProfileModal from "@/components/ProfileModal";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: profiles } = await supabase
    .from("profiles")
    .select()
    .eq("id", session.user.id);

  return (
    <main className='flex min-h-[90vh] flex-col px-4 p-12'>
      <Toaster />

      {profiles &&
        profiles.map((profile) => (
          <div key={profile.id}>
            {profile.full_name === null ? (
              <>
                <div className='relative w-[130px] h-[70px] flex justify-center mx-auto mt-12'>
                  <Image alt='' fill src='/logo.webp' />
                </div>
                <p className='mt-2 text-center'>Hello, {session.user.email}</p>
                <ProfileModal
                  id={session.user.id}
                  email={session.user.email}
                  {...profile}
                />
              </>
            ) : (
              <>
                {profile.verify === null && (
                  <div className='py-8 max-w-sm mx-auto text-center'>
                    <div className='relative w-[250px] h-[250px] flex justify-center mx-auto'>
                      <Image alt='' fill src='/welcome.svg' />
                      <p className='absolute bottom-2 rounded-full px-3 py-1 text-black bg-[#a99edb] animate-pulse'>
                        {profile.full_name}
                      </p>
                    </div>
                    Your registration is completed. Kindly contact the admin to
                    verify your membership.
                  </div>
                )}

                {profile.verify === "verified" && (
                  <LoanApplication
                    id={profile.id}
                    full_name={profile.full_name}
                    location={profile.location}
                    ippis_no={profile.ippis_no}
                    phone_no={profile.phone_no}
                    status={profile.status}
                  />
                )}
              </>
            )}
          </div>
        ))}
    </main>
  );
}
