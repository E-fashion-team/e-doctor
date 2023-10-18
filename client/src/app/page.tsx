"use client"

import Schedule from "./Schedule/Page";


import LandingPage from "./landingpage/page"

export default function Home() {

  // const router = useRouter(); // Use the Next.js router

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
    <div>
      <LandingPage/>

    </div>
  )
}