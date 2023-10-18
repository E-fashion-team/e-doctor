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
    <div>
      <LandingPage  />
    </div>
  )
}