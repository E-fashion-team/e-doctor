import './style.css'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div>
      <div className="topnav">
        <Link href='/homee'>Home</Link>
        <Link href='/allDoctors'>All Doctors</Link>
        <Link href='/allpati'>All Patients</Link>
        <Link href='/allReviwes'>All Reviews</Link>
      </div>
    </div>
  )
}

export default NavBar