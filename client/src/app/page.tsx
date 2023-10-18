import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import  getOnePatient  from '../../store/patinetSlice';
import  getAllDoctors  from '../../store/doctorSlice';
import  getOneDoctor  from '../../store/doctorSlice';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router'; // Use the Next.js router
import { Provider } from 'react-redux';
import {store} from '../../store/store';
import { Route, Routes } from 'react-router-dom';
import Signup from './signup/page';
import Overview from './doctorProfile/Overview/page';
import Review from './doctorProfile/Review/page';
import DoctorProfile from './doctorProfile/page';
import Login from './login/page';

export default function Home() {
  const dispatch = useDispatch();
  const doctor = useSelector((state: RootState) => state.doctor);
  const patient = useSelector((state: RootState) => state.patient);
  const router = useRouter(); // Use the Next.js router

  // useEffect(() => {
  //   const userType = localStorage.getItem('type');
  //   if (userType === 'patient') {
  //     dispatch(getOnePatient());
  //   } else if (userType === 'doctor') {
  //     dispatch(getOneDoctor());
  //   }
  //   dispatch(getAllDoctors());
  // }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/doctorProfile" element={<DoctorProfile />}>
            <Route path="/" element={<Overview />} />
            <Route path="review" element={<Review />} />
          </Route>
          <Route path="/Review" element={<Review />} />
        </Routes>
        <ToastContainer />
      </Provider>
    </div>
  );
}
