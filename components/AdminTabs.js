"use client";

import { Tab } from "@headlessui/react";
import Approved from "./adminDashboard/Approved";
import Request from "./adminDashboard/Request";
import VerifyUser from "./adminDashboard/VerifyUser";

const AdminTabs = ({ adminEmail, verify, loans, approved }) => {
  return (
    <Tab.Group>
      <Tab.List className='flex justify-center space-x-6 rounded-full bg-blue-900/20 p-1 my-4 max-w-md mx-auto'>
        <Tab className='ui-selected:bg-[#0A174E] ui-selected:text-[#F5D042] ui-not-selected:bg-white ui-not-selected:text-black px-4 rounded-full  py-3 text-sm font-medium leading-5 w-full'>
          Verify
        </Tab>

        <Tab className='ui-selected:bg-[#0A174E] ui-selected:text-[#F5D042] ui-not-selected:bg-white ui-not-selected:text-black px-4 rounded-full  py-3 text-sm font-medium leading-5 w-full'>
          Requests
        </Tab>

        <Tab className='ui-selected:bg-[#0A174E] ui-selected:text-[#F5D042] ui-not-selected:bg-white ui-not-selected:text-black px-4 rounded-full  py-3 text-sm font-medium leading-5 w-full'>
          Approved
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <VerifyUser verify={verify} />
        </Tab.Panel>
        <Tab.Panel>
          <Request adminEmail={adminEmail} loans={loans} />
        </Tab.Panel>
        <Tab.Panel>
          <Approved adminEmail={adminEmail} approved={approved} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default AdminTabs;
