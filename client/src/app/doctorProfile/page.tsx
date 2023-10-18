import React from 'react';
import SideBar from './sidebar/page';
import TopNav from './TopNav/page';
import "../doctorProfile/style/style.css"
import { Provider } from 'react-redux';
// import  {store}  from '../../../store/store';
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