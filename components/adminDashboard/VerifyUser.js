"use client";

import VerifyUserCard from "./VerifyUserCard";

const VerifyUser = ({ verify }) => {
  return (
    <div className='py-8'>
      <p className='text-2xl text-center font-light'>Verify Users</p>
      {verify.length < 1 ? (
        <p className='text-center'>No pending user for verification</p>
      ) : (
        <div className='w-full pt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row'>
          {verify.map((user) => (
            <VerifyUserCard key={user.id} {...user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VerifyUser;
