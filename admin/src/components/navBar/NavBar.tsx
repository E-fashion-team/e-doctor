import React from 'react'
import './style.css'
const NavBar = () => {
  return (
    <div>
  <div className="topnav">
  <a className="active" href="#home">Home</a>
  <a href="#news">All Doctors</a>
  <a href="#contact">All Patient</a>
  <a href="#about">All Reviwes</a>
</div>
    </div>
  )
}

export default NavBar