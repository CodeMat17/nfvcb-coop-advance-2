"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SpinnerIcon from "./SpinnerIcon";
import Tilt from 'react-parallax-tilt'

const SignupSignin = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [switchTabs, setSwitchTabs] = useState(true);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    setEmailError(false);
    setPasswordError(false);
    if (!email.match(regex)) {
      setEmailError(true);
      setLoading(false);
    }
    if (password.length < 6) {
      setPasswordError(true);
      setLoading(false);
    }
    if (email.match(regex) && password.length > 5) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        });
        if (error) {
          setError(error.message);
        }
        if (data) {
          setSubmitted(true);
          router.refresh();
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignIn = async () => {
     setLoading(true);
     setError(null);
     setEmailError(false);
     setPasswordError(false);
     if (!email.match(regex)) {
       setEmailError(true);
       setLoading(false);
     }
     if (password.length < 6) {
       setPasswordError(true);
       setLoading(false);
    }
    if (email.match(regex) && password.length > 5) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          setError(error.message);
        }
        if (data) {
          router.push("/");
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const switchLoginTabs = () => {
    if (switchTabs) {
      setSwitchTabs(false);
    } else {
      setSwitchTabs(true);
    }
  };

  if (submitted) {
    return (
      <div className='py-12 px-4 flex justify-center text-center'>
        Check you emaill box for email confirmation.
      </div>
    );
  }

  return (
    <Tilt>
      <div className='relative z-20 max-w-sm mx-auto bg-white bg-opacity-50 dark:bg-opacity-10 border border-gray-300 dark:border-0 px-4 py-8 rounded-2xl shadow-2xl backdrop-filter backdrop-blur-sm '>
        <p className='text-center text-2xl pt-4 pb-2'>
          {switchTabs ? "Sign In" : "Sign Up"}
        </p>

        {error && (
          <div className='flex justify-center items-center text-red bg-red-100 rounded-lg p-4'>
            {error}
          </div>
        )}

        <div className='mt-4'>
          <input
            name='email'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='Enter your email here'
            className='
         focus:outline-none px-4 py-3 border rounded-full w-full bg-transparent shadow-sm'
          />
          {emailError ? (
            <p className='text-sm text-red-400 pl-6 mb-2'>
              ***invalid email address***
            </p>
          ) : (
            <p className='mb-2'></p>
          )}

          <input
            name='password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Enter your password here'
            className='
         focus:outline-none px-4 py-3 border rounded-full mt-1 w-full bg-transparent shadow-sm'
          />
          {passwordError ? (
            <p className='text-sm text-red-400 pl-6 mb-2'>
              ***password cannot be less than 6 char***
            </p>
          ) : (
            <p className='mb-2'></p>
          )}

          {switchTabs ? (
            <div>
              <button
                onClick={handleSignIn}
                className='w-full p-4 rounded-full mt-4 bg-gradient-to-r from-green-500 to-yellow-500 hover:via-green-500/90 hover:to bg-yellow-500/70 text-white'>
                {loading ? (
                  <div className='flex items-center justify-center gap-x-2'>
                    <SpinnerIcon />
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
              <p className='text-center mt-4 text-sm'>
                If you a new user,{" "}
                <span
                  onClick={switchLoginTabs}
                  className='bg-gray-200 shadow-md rounded-full px-3 py-1 cursor-pointer text-blue-500 border border-gray-400 dark:border-gray-700'>
                  sign up
                </span>{" "}
                first.
              </p>
            </div>
          ) : (
            <div>
              <button
                onClick={handleSignUp}
                disabled={loading}
                className={`${
                  !loading
                    ? "bg-gray-500/30 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-yellow-500 hover:via-green-500/90 hover:to bg-yellow-500/70"
                } w-full p-4 rounded-full mt-4 text-white`}>
                {loading ? (
                  <div className='flex items-center justify-center gap-x-2'>
                    <SpinnerIcon />
                    Signing up...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>

              <p className='text-center mt-4 text-sm'>
                If you have signed up already,{" "}
                <span
                  onClick={switchLoginTabs}
                  className='bg-gray-200 shadow-md rounded-full px-3 py-1 cursor-pointer text-blue-500 border dark:border-gray-700'>
                  sign in
                </span>{" "}
                now.
              </p>
            </div>
          )}
        </div>
      </div>
    </Tilt>
  );
};

export default SignupSignin;
