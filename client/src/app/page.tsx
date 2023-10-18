import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import LandingPage from "./landingpage/page";
import { store } from "@/store/store";

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
      <LandingPage  />
    </div>
  )
}