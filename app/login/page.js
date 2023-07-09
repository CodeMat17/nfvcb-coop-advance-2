import SignupSignin from "@/components/SignupSignin";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className='relative px-4 py-16 h-screen min-h-screen w-screen overflow-hidden '>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-2/5 -translate-y-[400px]  bg-amber-700 w-[300px] h-[300px] rounded-full animate-pulse'></div>
      <div className='absolute bottom-1/2 left-1/2 transform -translate-x-64 translate-y-20 bg-gradient-to-r from-green-600  to-gray-700 w-[100px] h-[100px] rounded-full '></div>

      <SignupSignin />
    </div>
  );
};

export default LoginPage;
