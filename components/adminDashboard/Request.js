'use client'

import RequestCard from './RequestCard';
import { Toaster } from "react-hot-toast";


const Request = ({ adminEmail, loans }) => {
  return (
    <div className='py-8'>
      <Toaster />
      <p className='text-2xl text-center font-light'>Loan Requests</p>
      {loans.length < 1 ? (
        <p className='text-center'>No pending loan request at the moment.</p>
      ) : (
        <div className='w-full pt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row'>
          {loans.map((user) => (
            <RequestCard key={user.user_id} {...user} adminEmail={adminEmail} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Request