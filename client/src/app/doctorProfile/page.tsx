import React from 'react';
import SideBar from './sidebar/page';
import TopNav from './sidebar/page';
import "../doctorProfile/style/style.css"
const DoctorProfile = () => {
  return (
    <div className="DoctorProfile-body">
      <SideBar />
      <div className="DoctorProfile-main">
        <TopNav />
        {/* <Outlet /> */}
      </div>
    </div>
  );
};

export default DoctorProfile;