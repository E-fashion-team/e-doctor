import React from 'react';
import SideBar from './sidebar/page';
import TopNav from './sidebar/page';
import "../doctorProfile/style/style.css"
import { Provider } from 'react-redux';
import  {store}  from '../../../store/store';
const DoctorProfile = () => {
  return (
    <Provider store={store}>
    <div className="DoctorProfile-body">
      <SideBar />
      <div className="DoctorProfile-main">
        <TopNav />
        {/* <Outlet /> */}
      </div>
    </div>
    </Provider>
  );
};

export default DoctorProfile;