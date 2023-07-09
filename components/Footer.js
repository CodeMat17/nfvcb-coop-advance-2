import LogoComponent from "@/components/LogoComponent";

const Footer = () => {
  return (
    <div className='bg-gray-700'>
      <div className='p-4 max-w-6xl mx-auto'>
        <div className='flex items-center space-x-2'>
          <LogoComponent />
          <div className='text-[#F5D042] leading-3 text-semibold text-lg'>
            <p>COOP</p>
            <p>Advance</p>
          </div>
        </div>
        <div className='pt-4'>
          <p>Contact Us</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
