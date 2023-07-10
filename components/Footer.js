import LogoComponent from "@/components/LogoComponent";
import Link from "next/link";
import { BiMailSend } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { MdCall } from "react-icons/md";

const Footer = () => {
  return (
    <div className='w-full bg-gray-700'>
      <div className='p-4 max-w-6xl mx-auto'>
        <div className='flex items-center space-x-2'>
          <LogoComponent />
          <div className='text-[#F5D042] leading-3 text-semibold text-lg'>
            <p>COOP</p>
            <p>Advance</p>
          </div>
        </div>
        <div className='pt-4 text-white'>
          <p className='text-xl'>Contact Us</p>
          <div className='transition-all duration-700 py-2 flex items-center space-x-6'>
            <div className='border-2 border-gray-600 rounded-full p-2 bg-gray-800 hover:bg-[#0A174E]'>
              <a href='tel:+2348079551587' className='transition duration-700 '>
                <MdCall className={`  text-2xl font-semibold `} />
              </a>
            </div>
            <div className='border-2 border-gray-600 rounded-full p-2 bg-gray-800 hover:bg-[#0A174E]'>
              <a
                href='mailto:nfvcbcoop@gmail.com'
                className='transition duration-700 '>
                <BiMailSend className={`  text-2xl font-semibold `} />
              </a>
            </div>
            <div className='border-2 border-gray-600 rounded-full p-2 bg-gray-800 hover:bg-[#0A174E]'>
              <a
                href='https://wa.me/2348079551587'
                className='transition duration-700 '>
                <BsWhatsapp className={`  text-2xl font-semibold `} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className=' bg-[#0A174E] w-full py-6 text-center '>
                <p className=' text-lg text-white'>&copy; COOP Advance. All rights reserved.</p>

        <div className='pt-2 flex items-center justify-center space-x-2 text-sm text-gray-500'>
          <p>Click the icon</p>
          <Link href='https://wa.me/2348063856120'>
            <BsWhatsapp className={`  text-lg font-semibold `} />
          </Link>
          <p>to chat with the developer</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
