import React from 'react';
import SideBar from '../component/sidebar';
import TopNav from '../component/TopNav';
import "../style/style.css"
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