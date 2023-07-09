"use client";

import { Toaster } from "react-hot-toast";
import ApprovedCard from "./ApprovedCard";

const Approved = ({ adminEmail, approved }) => {
  return (
    <div className='py-8'>
      <Toaster />
      <p className='text-2xl text-center font-light'>Approved Loans</p>
      {approved.length < 1 ? (
        <p className='text-center'>No approved loan at the moment.</p>
      ) : (
        <div className='w-full pt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row'>
          {approved.map((user) => (
            <ApprovedCard
              key={user.user_id}
              {...user}
              adminEmail={adminEmail}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Approved;
