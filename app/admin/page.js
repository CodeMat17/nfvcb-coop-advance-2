import AdminTabs from "@/components/AdminTabs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 0;

const AdminDashboard = async () => {
  //   const supabase = createClientComponentClient();
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let adminEmail = user.email

  const { data: userProfile } = await supabase
    .from("profiles")
    .select("id, isAdmin, full_name")
    .eq("id", user.id);

  const { data: verify } = await supabase
    .from("profiles")
    .select("id, full_name, ippis_no, phone_no, location")
    .is("verify", null)
    .order("created_at", { ascending: false });

  const { data: loans } = await supabase
    .from("loans")
    .select("user_id, full_name, location, ippis_no, phone_no, amount, created_at")
    .order("created_at", { ascending: false })
    .eq("status", "processing");
  
  const { data: approved } = await supabase
    .from("loans")
    .select()
    .order("created_at", { ascending: false })
    .eq("status", "approved")
    .range(0, 19);
  
  return (
    <div className='px-4 py-12 w-full min-h-screen max-w-6xl mx-auto'>
      <div className=' text-center'>
        <p className='text-xl'>COOP Advance </p>
        <p className='text-3xl '>Admin Dashboard </p>
      </div>

      {userProfile &&
        userProfile.map((user) => (
          <div key={user.id}>
            {!user.isAdmin && (
              <p className='text-center py-12 text-lg max-w-sm mx-auto'>
                {user.full_name}, you do not have the permissions to view this
                page.
              </p>
            )}

            {user.isAdmin && (
              <AdminTabs
                adminEmail={adminEmail}
                verify={verify}
                loans={loans}
                approved={approved}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default AdminDashboard;
